import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nProvider } from '../../i18n';
import { trackCtaClick } from '../../analytics';
import { services } from '../../data/services';
import Header from './Light';

vi.mock('../../analytics', () => ({ trackCtaClick: vi.fn() }));

function renderHeader(basename = '') {
  window.__INITIAL_STATE__ = {};
  return render(
    <MemoryRouter basename={basename} initialEntries={[`${basename}/privacy`]}>
      <I18nProvider>
        <Header />
      </I18nProvider>
    </MemoryRouter>
  );
}

function desktopNav() {
  // The desktop nav is the first <nav>; the mobile one only mounts when open.
  return within(screen.getAllByRole('navigation')[0]);
}

afterEach(() => {
  cleanup();
  delete window.__INITIAL_STATE__;
  vi.mocked(trackCtaClick).mockClear();
});

describe('Header', () => {
  it('links services and case studies inside the visitor locale', () => {
    renderHeader('/pt');
    const nav = desktopNav();

    fireEvent.click(nav.getByRole('button', { name: 'nav_services' }));
    const serviceHrefs = services.map((s) =>
      nav.getByRole('link', { name: s.titleKey }).getAttribute('href')
    );
    expect(serviceHrefs).toEqual(services.map((s) => `/pt/services/${s.id}`));
    expect(nav.getByRole('link', { name: 'nav_case_studies' })).toHaveAttribute(
      'href',
      '/pt/case-studies'
    );
    expect(screen.getByRole('link', { name: 'Oni Web Officer' })).toHaveAttribute('href', '/pt');
  });

  it('opens and closes the services menu', () => {
    renderHeader();
    const trigger = desktopNav().getByRole('button', { name: 'nav_services' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    fireEvent.mouseDown(document.body);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    fireEvent.click(desktopNav().getByRole('link', { name: services[0].titleKey }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens a growth mailto and tracks the header CTA', () => {
    renderHeader();
    const cta = desktopNav().getByRole('link', { name: 'cta_growth_button' });

    expect(cta.getAttribute('href')).toMatch(/^mailto:oniweb@oniweb\.com\.br\?subject=cta_growth_title$/);
    fireEvent.click(cta);
    expect(trackCtaClick).toHaveBeenCalledWith('header_cta');
  });

  it('closes the mobile menu when a link is clicked', () => {
    renderHeader();
    const toggle = screen.getByRole('button', { name: 'nav_menu_toggle' });

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    const mobileNav = within(screen.getAllByRole('navigation')[1]);
    expect(mobileNav.getAllByRole('link', { name: services[0].titleKey })).toHaveLength(1);

    fireEvent.click(mobileNav.getByRole('link', { name: 'nav_case_studies' }));
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
