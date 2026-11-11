import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GlobeGL, { type GlobeMethods } from "react-globe.gl";
import { Color, MeshPhongMaterial } from "three";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
  ACTIVE_COLOR,
  CITIES,
  GLOBE_STYLE,
  INACTIVE_COLOR,
  type City,
} from "../data/cities";

type CountryFeatureCollection = {
  type: string;
  features: object[];
};

type GlobeProps = {
  className?: string;
};

/**
 * Streamax-compatible globe + vertical city Swiper
 * (same pattern as cn.streamax.com city-swiper: slidesPerView 3, loop, scale by slide class)
 */
export function Globe({ className = "" }: GlobeProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const swiperRef = useRef<SwiperType | null>(null);
  const readyRef = useRef(false);
  const [size, setSize] = useState({ w: 560, h: 560 });
  const [countries, setCountries] = useState<object[]>([]);
  const [activeId, setActiveId] = useState(CITIES[0].id);

  useEffect(() => {
    let cancelled = false;
    fetch("https://cdn.jsdelivr.net/npm/globe.gl/example/datasets/ne_110m_admin_0_countries.geojson")
      .then((r) => r.json())
      .then((geo: CountryFeatureCollection) => {
        if (!cancelled) setCountries(geo.features || []);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    g.pointOfView({ lat: 22.54, lng: 114.08, altitude: 1.55 }, 0);
    const controls = g.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;
    controls.enableZoom = false;
  }, [size.w, size.h, countries.length]);

  const globeMaterial = useMemo(
    () =>
      new MeshPhongMaterial({
        color: new Color(GLOBE_STYLE.globeColor),
        shininess: 8,
        transparent: true,
        opacity: 0.95,
      }),
    [],
  );

  const pointsData = useMemo(
    () =>
      CITIES.map((c) => ({
        ...c,
        color: c.id === activeId ? ACTIVE_COLOR : INACTIVE_COLOR,
      })),
    [activeId],
  );

  const focusCity = useCallback((city: City) => {
    setActiveId(city.id);
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = false;
    g.pointOfView({ lat: city.lat, lng: city.lng, altitude: 1.55 }, 1200);
    window.setTimeout(() => {
      controls.autoRotate = true;
    }, 2200);
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".globe-label").forEach((el) => {
      const id = Number(el.dataset.cityId);
      el.style.color = id === activeId ? ACTIVE_COLOR : INACTIVE_COLOR;
    });
  }, [activeId]);

  const labelElement = useCallback((d: object) => {
    const city = d as City & { color: string };
    const el = document.createElement("div");
    el.className = "globe-label";
    el.dataset.cityId = String(city.id);
    el.textContent = city.tag;
    el.style.color = city.color;
    el.style.fontSize = "12px";
    el.style.whiteSpace = "nowrap";
    el.style.pointerEvents = "none";
    el.style.userSelect = "none";
    el.style.fontFamily = "Inter, system-ui, sans-serif";
    return el;
  }, []);

  const onSlideChange = useCallback(
    (swiper: SwiperType) => {
      if (!readyRef.current) return;
      const city = CITIES[swiper.realIndex];
      if (city) focusCity(city);
    },
    [focusCity],
  );

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <GlobeGL
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeMaterial={globeMaterial}
        atmosphereColor={GLOBE_STYLE.atmosphereColor}
        atmosphereAltitude={GLOBE_STYLE.atmosphereAltitude}
        hexPolygonsData={countries}
        hexPolygonResolution={3}
        hexPolygonMargin={0.65}
        hexPolygonColor={() => "#9aa3ad"}
        hexPolygonAltitude={0.004}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={0.01}
        pointRadius={(d) => ((d as City).id === activeId ? 0.45 : 0.32)}
        pointsMerge={false}
        htmlElementsData={pointsData}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.02}
        htmlElement={labelElement}
        onPointClick={(p) => {
          const city = p as City;
          focusCity(city);
          const idx = CITIES.findIndex((c) => c.id === city.id);
          if (idx !== -1) swiperRef.current?.slideToLoop(idx, 600);
        }}
        animateIn={false}
      />

      {/* Streamax: .city-swiper-container — vertical loop, 3 visible */}
      <div className="city-swiper-container">
        <Swiper
          className="city-swiper"
          direction="vertical"
          slidesPerView={3}
          centeredSlides={false}
          loop
          allowTouchMove
          spaceBetween={0}
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
            window.setTimeout(() => {
              readyRef.current = true;
            }, 50);
          }}
          onSlideChange={onSlideChange}
        >
          {CITIES.map((city) => (
            <SwiperSlide key={city.id}>
              <div
                className={`city-card ${city.id === activeId ? "selected" : ""}`}
                onClick={() => {
                  focusCity(city);
                  const idx = CITIES.findIndex((c) => c.id === city.id);
                  if (idx !== -1) swiperRef.current?.slideToLoop(idx, 600);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    focusCity(city);
                    const idx = CITIES.findIndex((c) => c.id === city.id);
                    if (idx !== -1) swiperRef.current?.slideToLoop(idx, 600);
                  }
                }}
              >
                <div className="city-tag-img">
                  <img src={city.src} alt="" />
                </div>
                <div className="city-tag-text">{city.tag}</div>
                <div className="city-tag-icon">
                  <img src={city.icon} alt="" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
