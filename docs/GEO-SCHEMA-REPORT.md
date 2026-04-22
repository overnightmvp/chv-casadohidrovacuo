# GEO Schema & Structured Data Analysis
**Target:** https://casadohidrovacuo.com.br/
**Date:** 2026-04-14
**Business Type:** Local Brake Repair Service (AutoRepair specialization)

---

## Executive Summary

**Schema Completeness Score: 0/100** — CRITICAL
**Status:** No structured data detected
**AI Discoverability:** Severely compromised

The website currently has **zero structured data markup**. This means:
- Google cannot understand business identity, hours, or service area
- AI models (Claude, ChatGPT, Perplexity) cannot extract entity information for knowledge graphs
- Voice search assistants cannot find location or hours
- No rich results eligible
- Local SEO severely handicapped

---

## Detected Structured Data

| # | Type | Format | Valid | Rich Result Eligible |
|---|---|---|---|---|
| **NONE** | **N/A** | **N/A** | **No** | **No** |

**Total Schema Blocks:** 0
**Formats Used:** None
**Validation:** N/A

---

## Schema Audit by Component

### LocalBusiness / AutoRepair
**Status:** ❌ **MISSING - CRITICAL**

This is the primary business identity schema. Casa do Hidrovácuo MUST have this.

**Available Data for Population:**
- `name`: "Casa do Hidrovácuo"
- `image`: [Company logo URL needed]
- `telephone`: "+55 41 3345-7373"
- `address`: "Rua Augusto de Mari, 3720, Portão, Curitiba, SP 82110-330, BR"
- `areaServed`: "Curitiba, Paraná, Brazil" (Metropolitan Region)
- `openingHoursSpecification`: Mon-Fri 8:00-18:00 (Seg-Sex 08h-18h)
- `foundingDate`: "1994"
- `priceRange`: "$$" (R$ 120–420 depending on service)
- `aggregateRating`: AggregateRating with ratingValue: 4.9, reviewCount: 247
- `url`: "https://casadohidrovacuo.com.br"

**Impact:** Google Local Pack, Maps rich results, voice assistant discovery
**Rich Result Eligible:** Yes (Local Pack)

### Organization
**Status:** ❌ **MISSING - HIGH PRIORITY**

**Missing Critical Elements:**
- `sameAs` linking (Wikipedia, Wikidata, LinkedIn, Google Business)
- Entity verification for knowledge graph
- Brand identity signals

### BreadcrumbList
**Status:** ❌ **MISSING - HIGH**

Navigation context for crawlers. Site has clear service hierarchies:
- Home > Hidrovácuo (Servo-Freio)
- Home > Cilindro Mestre
- Home > Peças Raras e Clássicos
- Home > Linha Pesada
- Home > Pastilhas e Revisão
- Home > Dúvidas Técnicas

### FAQPage
**Status:** ❌ **MISSING - MEDIUM**

Page exists at `/perguntas-frequentes` with FAQ content. However, note: **FAQPage rich results are restricted** (as of Aug 2023) and only shown for well-known government/health authority sites. The schema still provides semantic value for AI models understanding Q&A structure.

### WebSite + SearchAction
**Status:** ❌ **MISSING - LOW**

Enables sitelinks search box in search results. Homepage should have this.

---

## sameAs Entity Linking Assessment

**Current Status:** None detected

**Recommended Platforms to Link (Priority Order):**

| Platform | Why Important | URL Pattern |
|---|---|---|
| Google Business Profile | Local search visibility | https://www.google.com/maps/place/Casa+do+Hidrovácuo |
| Wikipedia | Knowledge graph verification | https://pt.wikipedia.org/wiki/[if exists] |
| Wikidata | Entity resolution for AI | https://www.wikidata.org/wiki/[entity_id] |
| LinkedIn Company | B2B credibility | https://www.linkedin.com/company/casa-do-hidrovacuo |
| YouTube Channel | Video testimonials/tutorials | https://www.youtube.com/@[channel] |
| Facebook Page | Social proof | https://www.facebook.com/casadohidrovacuo |
| Instagram | Social proof | https://www.instagram.com/casadohidrovacuo |

---

## Deprecated / Restricted Schemas

**None found.** (No schemas currently present.)

---

## JavaScript Rendering Risk

**Status:** Not applicable — no schema injected
**Recommendation:** Implement schemas in static HTML `<head>` to ensure immediate Google and AI crawler processing.

---

## Recommended JSON-LD Templates

### Template 1: LocalBusiness / AutoRepair (CRITICAL)

```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Casa do Hidrovácuo",
  "image": "https://casadohidrovacuo.com.br/logo.png",
  "description": "Especialistas em recuperação de hidrovácuo, cilindro mestre e peças raras para freios em Curitiba. 31 anos de experiência com oficina própria e bancada pneumática.",
  "url": "https://casadohidrovacuo.com.br",
  "telephone": "+55 41 3345-7373",
  "email": "[REPLACE: contact email if available]",
  "priceRange": "$$",
  "areaServed": {
    "@type": "Place",
    "name": "Curitiba, Região Metropolitana, Paraná, Brasil"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Augusto de Mari, 3720",
    "addressLocality": "Curitiba",
    "addressRegion": "PR",
    "postalCode": "82110-330",
    "addressCountry": "BR"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "CLOSED",
      "closes": "CLOSED"
    }
  ],
  "foundingDate": "1994",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "247"
  },
  "sameAs": [
    "https://www.google.com/maps/place/Casa+do+Hidrovácuo",
    "https://www.facebook.com/casadohidrovacuo",
    "[REPLACE: LinkedIn company page URL]",
    "[REPLACE: YouTube channel URL]"
  ],
  "knowsAbout": [
    "Brake repair",
    "Vacuum brake system (hidrovácuo)",
    "Master cylinder repair",
    "Vintage car brakes",
    "Commercial vehicle brakes",
    "Brake pad replacement"
  ]
}
```

**Implementation:** Add to `<head>` inside `<script type="application/ld+json">` tag.
**Rich Result Eligible:** ✓ Yes (Google Local Pack)

---

### Template 2: Organization (With sameAs)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Casa do Hidrovácuo",
  "url": "https://casadohidrovacuo.com.br",
  "logo": "https://casadohidrovacuo.com.br/logo.png",
  "description": "Especialistas em recuperação de hidrovácuo, cilindro mestre e peças raras para freios. 31 anos de experiência em Curitiba.",
  "foundingDate": "1994",
  "foundingLocation": {
    "@type": "Place",
    "name": "Portão, Curitiba, PR, Brasil"
  },
  "sameAs": [
    "https://www.google.com/maps/place/Casa+do+Hidrovácuo",
    "https://www.facebook.com/casadohidrovacuo",
    "[REPLACE: LinkedIn company page]",
    "[REPLACE: YouTube channel]",
    "[REPLACE: Instagram profile]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+55 41 3345-7373",
    "email": "[REPLACE: support email]",
    "areaServed": "BR"
  }
}
```

---

### Template 3: BreadcrumbList (For Service Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Casa do Hidrovácuo",
      "item": "https://casadohidrovacuo.com.br"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Serviços",
      "item": "https://casadohidrovacuo.com.br/#o-que-resolvemos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[REPLACE: Current Page Title]",
      "item": "[REPLACE: Current Page URL]"
    }
  ]
}
```

**Note:** Generate unique BreadcrumbList for each service page (/recuperacao-hidrovacuo-curitiba/, /conserto-cilindro-mestre-curitiba/, etc.)

---

### Template 4: FAQPage (For /perguntas-frequentes)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual a diferença entre recuperar e comprar novo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recuperamos mantendo a peça original, preservando a carcaça e substituindo apenas os componentes internos desgastados. O custo é 50-60% menor que peça nova paralela, com mesma garantia."
      }
    },
    {
      "@type": "Question",
      "name": "Qual o prazo de recuperação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[REPLACE: From page content]"
      }
    },
    {
      "@type": "Question",
      "name": "Vocês fazem retirada e instalação?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sim. Nossa oficina fica na Rua Augusto de Mari, 3720 (Portão). Você pode deixar o carro inteiro ou apenas trazer as peças caso seu mecânico já tenha feito a desmontagem."
      }
    }
  ]
}
```

**Important Note:** FAQPage rich results are **restricted** (as of Aug 2023) and only display for well-known government/health authority websites. This schema will NOT generate rich results for Casa do Hidrovácuo, but still provides semantic value for AI models.

---

### Template 5: WebSite + SearchAction (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Casa do Hidrovácuo",
  "url": "https://casadohidrovacuo.com.br",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://casadohidrovacuo.com.br/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Note:** Requires functional search endpoint at `/buscar?q=` for sitelinks search box to appear.

---

## Priority Implementation Roadmap

### CRITICAL (Week 1)
1. **Add LocalBusiness/AutoRepair schema** with:
   - Complete NAP (Name, Address, Phone)
   - Opening hours
   - Aggregate rating (4.9/5, 247 reviews)
   - Service area (Curitiba region)
   - Price range indicators
   - sameAs linking to Google Maps, Facebook

2. **Add Organization schema** with comprehensive `sameAs` linking

### HIGH (Week 2)
3. **Add BreadcrumbList** to all service pages
4. **Populate sameAs** with LinkedIn, YouTube, Instagram (create if missing)

### MEDIUM (Week 3)
5. **Add FAQPage schema** to /perguntas-frequentes page
6. **Add speakable property** to service descriptions for voice search

### LOW (Week 4)
7. **Add WebSite + SearchAction** if search functionality implemented

---

## Validation Checklist

- [ ] All JSON-LD scripts added to `<head>`
- [ ] Tested with Google Rich Results Test
- [ ] Phone number formatted as international (+55 41 3345-7373)
- [ ] Dates in ISO 8601 format
- [ ] URLs are absolute (not relative)
- [ ] No placeholder values left in production
- [ ] LocalBusiness coordinates added (if available)
- [ ] Service area clearly specified
- [ ] sameAs links verified as active
- [ ] Rating source documented (Google)

---

## Files to Modify

Add `<script type="application/ld+json">` blocks to:

1. **Homepage (`index.html` or template):** LocalBusiness, Organization, WebSite+SearchAction
2. **Service pages** (`/recuperacao-hidrovacuo-curitiba/`, etc.): BreadcrumbList
3. **FAQ page** (`/perguntas-frequentes`): FAQPage
4. **Consider** adding to layout base if using template system (ensures presence across all pages)

---

## Expected GEO Impact After Implementation

| Metric | Current | After Schema |
|---|---|---|
| AI Entity Recognition | None | Complete business profile |
| Local Pack Eligibility | No | Yes |
| Voice Search Discoverability | No | Yes |
| Knowledge Graph Presence | No | Yes |
| Rich Result Eligibility | 0 types | 1-2 types (Local Pack) |
| Google Maps Integration | Manual | Automatic via sameAs |

---

## Next Steps

1. Update business information on all linked platforms (Google Maps, Facebook, LinkedIn)
2. Implement JSON-LD templates in HTML `<head>`
3. Verify with Google Rich Results Test: https://search.google.com/test/rich-results
4. Monitor Google Search Console for schema errors
5. Request review of URL in Google Search Console to refresh cache
