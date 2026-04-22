# PageSpeed Insights Baseline Report
**Date**: 2026-04-22
**API Key**: Configured (chv-casadohidrovacuo project)

---

## 📊 Performance Scores Summary

| Page | Mobile | Desktop | Status |
|------|--------|---------|--------|
| **Homepage** | 75/100 | 96/100 | ⚠️ Mobile needs improvement |
| **Recuperação Hidrovácuo** | 84/100 | — | ⚠️ Slight LCP issue |
| **Pedal Duro** | 99/100 | — | ✅ Excellent |

---

## 🎯 Core Web Vitals - Mobile

### Homepage (casadohidrovacuo.com.br/)
**Performance Score**: 75/100

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **LCP** (Largest Contentful Paint) | 2.7s | < 2.5s | ⚠️ **Needs Improvement** |
| **CLS** (Cumulative Layout Shift) | 0.022 | < 0.1 | ✅ Good |
| **FCP** (First Contentful Paint) | 1.5s | < 1.8s | ✅ Good |
| **TBT** (Total Blocking Time) | 610ms | < 300ms | ⚠️ **High** |
| **Speed Index** | 5.8s | < 3.4s | ⚠️ **Needs Improvement** |

**Issues**:
- ⚠️ LCP at 2.7s is 200ms over the 2.5s threshold (minor)
- 🔴 TBT at 610ms indicates JavaScript blocking (should be < 300ms)
- ⚠️ Speed Index at 5.8s shows slow visual load

### Recuperação Hidrovácuo
**Performance Score**: 84/100

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **LCP** | 2.8s | < 2.5s | ⚠️ **Needs Improvement** |
| **CLS** | 0.032 | < 0.1 | ✅ Good |
| **FCP** | 1.8s | < 1.8s | ✅ Good |

**Issues**:
- ⚠️ LCP at 2.8s is 300ms over target

### Pedal Duro (pedal-duro-o-que-fazer.html)
**Performance Score**: 99/100 ⭐

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **LCP** | 1.7s | < 2.5s | ✅ **Excellent** |
| **CLS** | 0 | < 0.1 | ✅ **Perfect** |
| **FCP** | 1.1s | < 1.8s | ✅ **Excellent** |

**Status**: 🎉 Nearly perfect! This page is the performance benchmark.

---

## 💻 Desktop Performance

### Homepage
**Performance Score**: 96/100 ⭐

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| **LCP** | 0.7s | < 2.5s | ✅ **Excellent** |
| **CLS** | 0.005 | < 0.1 | ✅ **Perfect** |
| **FCP** | 0.6s | < 1.8s | ✅ **Excellent** |
| **TBT** | 130ms | < 300ms | ✅ Good |
| **Speed Index** | 1.3s | < 3.4s | ✅ **Excellent** |

**Status**: Desktop performance is excellent across all metrics.

---

## 🔍 Analysis

### What's Working Well
✅ **Excellent CLS** across all pages (< 0.1)
✅ **Desktop performance** is outstanding (96/100)
✅ **Pedal Duro page** achieves near-perfect mobile score (99/100)
✅ **FCP** is good on all pages (< 2s)

### Critical Issues

#### 1. Mobile LCP Slightly Over Target
**Pages Affected**: Homepage (2.7s), Recuperação (2.8s)
**Impact**: Minor SEO ranking factor, users may perceive slow load
**Target**: Reduce to < 2.5s

**Likely Causes**:
- Large hero images not optimized for mobile
- Render-blocking resources
- Slow server response time

**Solutions**:
1. Optimize hero images:
   - Use WebP format with fallbacks
   - Implement responsive images (`srcset`)
   - Add `fetchpriority="high"` to LCP image
2. Preload critical resources (already using `rel="preload"`)
3. Use CDN for asset delivery

#### 2. High Total Blocking Time (Homepage Mobile)
**Value**: 610ms (target: < 300ms)
**Impact**: Page feels sluggish, delayed interactivity

**Likely Causes**:
- Google Analytics script (deferred but still blocking)
- JavaScript execution blocking main thread

**Solutions**:
1. Break up long JavaScript tasks
2. Code-split JavaScript bundles
3. Defer non-critical JavaScript further
4. Consider removing/replacing heavy third-party scripts

#### 3. Slow Speed Index (Homepage Mobile)
**Value**: 5.8s (target: < 3.4s)
**Impact**: Slow perceived load time

**Causes**:
- Relates to TBT and LCP issues above
- Visual elements loading slowly

---

## 📈 Optimization Priority

### High Priority (Mobile Performance)
1. **Optimize LCP on homepage and recuperacao pages**
   - Target: Reduce from 2.7-2.8s to < 2.4s
   - Impact: Pass Core Web Vitals threshold
   - Effort: 2-4 hours

2. **Reduce Total Blocking Time on homepage**
   - Target: Reduce from 610ms to < 300ms
   - Impact: Better mobile interactivity
   - Effort: 3-5 hours (JavaScript optimization)

### Medium Priority
3. **Improve Speed Index**
   - Will improve automatically when LCP and TBT are fixed
   - Target: < 3.4s

### Low Priority
- Desktop performance is already excellent (96/100)
- CLS is excellent on all pages (no action needed)

---

## 🎯 Recommended Next Steps

### Week 1: Quick Wins (2-4 hours)
1. Add `fetchpriority="high"` to LCP image on homepage
2. Convert hero images to WebP format
3. Implement responsive images with `srcset`
4. Test: Re-run PageSpeed after changes

### Week 2: JavaScript Optimization (4-6 hours)
1. Audit Google Analytics impact
2. Break up long tasks (> 50ms)
3. Defer non-critical scripts
4. Consider code splitting

### Week 3: Advanced Optimization
1. Implement image CDN
2. Server-side optimizations (if applicable)
3. Consider service worker for caching

---

## 📊 Tracking Progress

**Baseline Established**: 2026-04-22

**Next Audit**: After LCP optimization (1-2 weeks)

**Success Metrics**:
- Mobile homepage LCP < 2.5s
- Mobile homepage TBT < 300ms
- Mobile homepage score > 85/100

**Re-run Command**:
```bash
# Set API key first
export PAGESPEED_API_KEY="AIzaSyD55HiWbqxlnJTvsaXL50zWrqztwaE-U9s"

# Mobile
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://casadohidrovacuo.com.br/&strategy=mobile&key=$PAGESPEED_API_KEY"

# Desktop
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://casadohidrovacuo.com.br/&strategy=desktop&key=$PAGESPEED_API_KEY"
```

---

## 🏆 Benchmark Page

The **Pedal Duro** page (99/100 mobile) should be used as a reference for optimizing other pages:
- LCP: 1.7s (vs 2.7s homepage)
- CLS: 0 (perfect)
- FCP: 1.1s

**What's different on Pedal Duro page?**
- Likely lighter hero section
- Less JavaScript execution
- Faster initial render

Consider applying similar patterns to homepage and service pages.

---

*Baseline established via PageSpeed Insights API v5*
*Project: chv-casadohidrovacuo*
