"use client";

import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Contact", href: "/#contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const label = mounted
    ? `Switch to ${isDark ? "light" : "dark"} theme`
    : "Toggle color theme";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    dialogRef.current?.close();
    setIsOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog?.open) dialog?.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    desktopQuery.addEventListener("change", onDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      desktopQuery.removeEventListener("change", onDesktop);
    };
  }, [isOpen, closeMenu]);

  useEffect(() => {
    dialogRef.current?.close();
    setIsOpen(false);
  }, [pathname]);

  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Isaac Pandraju home">
          <span className="brand-mark" aria-hidden="true">IP<span>.</span></span>
          <span className="brand-name">Isaac Pandraju<span>Data Engineer</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.label} className="nav-link" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="resume-link" href="/Isaac_Pandraju_Data_Engineer.pdf" download>
            Resume <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        id="mobile-navigation"
        className="mobile-menu"
        aria-labelledby="mobile-navigation-title"
        onKeyDown={trapFocus}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
        onClose={() => setIsOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom
          ) closeMenu();
        }}
      >
        <div className="mobile-menu-heading">
          <span id="mobile-navigation-title">Navigation</span>
          <button
            type="button"
            className="theme-toggle"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            <X size={23} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              key={link.label}
              className="mobile-nav-link"
              href={link.href}
              onClick={closeMenu}
            >
              <span><small aria-hidden="true">0{index + 1}</small>{link.label}</span>
              <ArrowUpRight size={25} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <a
          className="resume-link mobile-resume-link"
          href="/Isaac_Pandraju_Data_Engineer.pdf"
          download
          onClick={closeMenu}
        >
          Download resume <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </dialog>
    </header>
  );
}
