// Strukturirani podaci (JSON-LD). Sadrže samo podatke koji su vidljivi na stranici:
// bez izmišljenih ocjena, radnog vremena ili certifikata.
import { site } from '../data/site.ts';
import type { Service } from '../data/services.ts';

const orgId = `${site.url}/#agencija`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AccountingService',
    '@id': orgId,
    name: site.legalName,
    alternateName: ['Agencija Account', 'ACCOUNT'],
    url: `${site.url}/`,
    image: `${site.url}/images/og-account.jpg`,
    ...(site.logo ? { logo: `${site.url}${site.logo.full}` } : {}),
    telephone: site.phones.map((p) => p.e164),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    sameAs: site.social.map((s) => s.url),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).href,
    })),
  };
}

export function serviceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.intro,
    url: `${site.url}/${service.slug}`,
    provider: { '@id': orgId, '@type': 'AccountingService', name: site.legalName },
    areaServed: { '@type': 'City', name: site.address.city },
  };
}

export function articleSchema(a: { title: string; description: string; slug: string; published: string; updated: string; image: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.published,
    dateModified: a.updated,
    image: `${site.url}/images/${a.image}-1200.webp`,
    mainEntityOfPage: `${site.url}/savjeti/${a.slug}`,
    author: { '@type': 'Organization', '@id': orgId, name: site.legalName },
    publisher: { '@type': 'Organization', '@id': orgId, name: site.legalName },
    inLanguage: 'bs-BA',
  };
}
