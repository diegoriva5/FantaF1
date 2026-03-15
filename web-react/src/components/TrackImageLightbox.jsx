import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.25;

function clampZoom(value) {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
}

function clampUnit(value) {
  return Math.max(0, Math.min(1, value));
}

export default function TrackImageLightbox({
  src,
  alt,
  imageClassName,
  triggerClassName = "trackImageTrigger",
}) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [baseDimensions, setBaseDimensions] = useState({ width: 0, height: 0 });
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const dragStateRef = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const pendingWheelAnchorRef = useRef(null);

  const recomputeBaseDimensions = useCallback(() => {
    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!viewport || !image) return;

    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;

    const viewportWidth = Math.max(1, viewport.clientWidth - 32);
    const viewportHeight = Math.max(1, viewport.clientHeight - 32);
    const fitScale = Math.min(viewportWidth / naturalWidth, viewportHeight / naturalHeight, 1);

    setBaseDimensions({
      width: Math.max(1, naturalWidth * fitScale),
      height: Math.max(1, naturalHeight * fitScale),
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = window.requestAnimationFrame(recomputeBaseDimensions);
    window.addEventListener("resize", recomputeBaseDimensions);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", recomputeBaseDimensions);
    };
  }, [isOpen, recomputeBaseDimensions, src]);

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (event) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      event.preventDefault();
      const dragState = dragStateRef.current;
      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;

      viewport.scrollLeft = dragState.scrollLeft - deltaX;
      viewport.scrollTop = dragState.scrollTop - deltaY;
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging]);

  useLayoutEffect(() => {
    const anchor = pendingWheelAnchorRef.current;
    if (!anchor) return;

    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!viewport || !image) {
      pendingWheelAnchorRef.current = null;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const imageRect = image.getBoundingClientRect();
      const pointerImageX = imageRect.left + anchor.ratioX * imageRect.width;
      const pointerImageY = imageRect.top + anchor.ratioY * imageRect.height;

      viewport.scrollLeft += pointerImageX - anchor.clientX;
      viewport.scrollTop += pointerImageY - anchor.clientY;
      pendingWheelAnchorRef.current = null;
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [zoom]);

  if (!src) return null;

  function openLightbox() {
    window.scrollTo(0, 0);
    setZoom(1);
    setIsDragging(false);
    setBaseDimensions({ width: 0, height: 0 });
    setIsOpen(true);
  }

  function closeLightbox() {
    setIsDragging(false);
    setIsOpen(false);
  }

  function zoomIn() {
    setZoom((current) => clampZoom(current + ZOOM_STEP));
  }

  function zoomOut() {
    setZoom((current) => clampZoom(current - ZOOM_STEP));
  }

  function resetZoom() {
    setZoom(1);
  }

  function handleWheel(event) {
    event.preventDefault();

    const viewport = viewportRef.current;
    const image = imageRef.current;
    if (!viewport || !image) return;

    const imageRect = image.getBoundingClientRect();
    const ratioX = clampUnit((event.clientX - imageRect.left) / (imageRect.width || 1));
    const ratioY = clampUnit((event.clientY - imageRect.top) / (imageRect.height || 1));
    const delta = event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;

    pendingWheelAnchorRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      ratioX,
      ratioY,
    };

    setZoom((current) => {
      const next = clampZoom(current + delta);
      if (next === current) {
        pendingWheelAnchorRef.current = null;
      }
      return next;
    });
  }

  function handleDragStart(event) {
    if (event.button !== 0 || zoom <= 1) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();

    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };

    setIsDragging(true);
  }

  const renderedWidth = baseDimensions.width > 0 ? baseDimensions.width * zoom : null;
  const renderedHeight = baseDimensions.height > 0 ? baseDimensions.height * zoom : null;

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={openLightbox}
        aria-label={t("lightbox.openAria", { alt })}
      >
        <img src={src} alt={alt} className={imageClassName} loading="lazy" />
      </button>

      {isOpen && (
        <div
          className="trackLightboxOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={t("lightbox.previewAria", { alt })}
          onClick={closeLightbox}
        >
          <div className="trackLightboxFrame" onClick={(event) => event.stopPropagation()}>
            <div className="trackLightboxToolbar">
              <strong className="trackLightboxTitle">{alt}</strong>
              <div className="trackLightboxControls">
                <button
                  type="button"
                  className="trackLightboxButton"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label={t("lightbox.zoomOutAria")}
                >
                  -
                </button>
                <span className="trackLightboxZoomLabel">{Math.round(zoom * 100)}%</span>
                <button
                  type="button"
                  className="trackLightboxButton"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label={t("lightbox.zoomInAria")}
                >
                  +
                </button>
                <button
                  type="button"
                  className="trackLightboxButton"
                  onClick={resetZoom}
                  aria-label={t("lightbox.resetAria")}
                >
                  {t("lightbox.resetButton")}
                </button>
                <button
                  type="button"
                  className="trackLightboxButton"
                  onClick={closeLightbox}
                  aria-label={t("lightbox.closeAria")}
                >
                  {t("lightbox.closeButton")}
                </button>
              </div>
            </div>

            <div
              ref={viewportRef}
              className={`trackLightboxViewport ${zoom > 1 ? "draggable" : ""} ${isDragging ? "dragging" : ""}`.trim()}
              onMouseDown={handleDragStart}
              onWheel={handleWheel}
            >
              <div className="trackLightboxStage">
                <img
                  ref={imageRef}
                  src={src}
                  alt={alt}
                  className="trackLightboxImage"
                  onLoad={recomputeBaseDimensions}
                  style={renderedWidth && renderedHeight
                    ? { width: `${renderedWidth}px`, height: `${renderedHeight}px` }
                    : undefined}
                />
              </div>
            </div>

            <p className="trackLightboxHint">{t("lightbox.hint")}</p>
          </div>
        </div>
      )}
    </>
  );
}
