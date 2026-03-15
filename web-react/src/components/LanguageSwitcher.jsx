import { useEffect, useMemo, useRef, useState } from "react";
import { LANGUAGE_OPTIONS, useI18n } from "../i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  const currentOption = useMemo(
    () => LANGUAGE_OPTIONS.find((option) => option.code === language) || LANGUAGE_OPTIONS[0],
    [language],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="languageSwitcher" ref={rootRef}>
      <button
        type="button"
        className="languageSwitcherButton"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("language.switchAriaLabel")}
      >
        <span className="languageSwitcherLabel">{t("language.label")}</span>
        <span className="languageSwitcherCurrent">
          {currentOption.flag} {currentOption.code.toUpperCase()}
        </span>
        <span className="languageSwitcherChevron" aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className="languageSwitcherMenu" role="listbox" aria-label={t("language.label")}>
          {LANGUAGE_OPTIONS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                className={`languageSwitcherOption ${option.code === language ? "active" : ""}`.trim()}
                role="option"
                aria-selected={option.code === language}
                onClick={() => {
                  setLanguage(option.code);
                  setIsOpen(false);
                }}
              >
                <span>{option.flag}</span>
                <span>{t(option.labelKey)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
