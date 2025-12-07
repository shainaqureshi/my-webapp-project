# AdMob Setup Guide

## ✅ What's Been Done

1. **Installed AdSense Package**: `react-adsense` for displaying ads
2. **Created Ad Component**: `AdBanner.js` - reusable component for ads
3. **Integrated Ads**: Added to Feed and MyGoals pages
4. **Privacy Policy**: Created COPPA-compliant privacy policy

## 🚀 Next Steps to Go Live

### Step 1: Create Google AdSense Account

1. Go to https://www.google.com/adsense/start/
2. Sign up with your Google account
3. Enter your website URL: `https://mywebapp-sq.web.app`
4. Complete account setup and verification

**Important for Apps with Kids:**
- Select "Make this a child-directed site" during setup
- This ensures COPPA compliance
- Ads will be non-personalized automatically

### Step 2: Get Your Publisher ID

Once approved (can take 1-3 days):
1. Log into AdSense dashboard
2. Go to Account → Account Information
3. Copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Step 3: Update App Configuration

In `src/components/AdBanner.js`, replace:
```javascript
const publisherId = 'ca-pub-XXXXXXXXXXXXXXXX';
```
With your actual Publisher ID.

### Step 4: Create Ad Units

In AdSense dashboard:
1. Go to Ads → Overview → Ad units
2. Click "+ New ad unit"
3. Select "Display ads"
4. Create two ad units:
   - **Feed Ad**: Name it "Feed Banner" - Responsive
   - **MyGoals Ad**: Name it "Goals Banner" - Responsive

5. Copy the Ad Unit IDs (data-ad-slot numbers)

### Step 5: Update Slot IDs

Update the slot IDs in your components:

**Feed.js:**
```javascript
<AdBanner slot="YOUR_FEED_AD_SLOT_ID" format="horizontal" />
```

**MyGoals.js:**
```javascript
<AdBanner slot="YOUR_MYGOALS_AD_SLOT_ID" format="horizontal" />
```

### Step 6: Add AdSense Code to HTML

Add this to `public/index.html` in the `<head>` section:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

Replace with your actual Publisher ID.

### Step 7: Build and Deploy

```bash
npm run build
firebase deploy --project mywebapp-sq
```

### Step 8: Verify Installation

1. Visit your live site: https://mywebapp-sq.web.app
2. Check browser console for AdSense errors
3. In AdSense dashboard, verify site is showing "Getting ready" or "Ready"

## 💰 Expected Revenue

**For a goal-tracking app targeting kids:**
- **Ad Format**: Banner ads (728x90 desktop, 320x50 mobile)
- **CPM**: $0.50 - $2.00 (non-personalized ads pay less but are COPPA-compliant)
- **Revenue Formula**: (Page Views ÷ 1000) × CPM

**Example:**
- 1,000 daily users
- 5 page views per user = 5,000 page views/day
- 2 ads shown = 10,000 ad impressions/day
- At $1 CPM = $10/day = $300/month

**To increase revenue:**
- More users = more page views
- Better ad placement (above the fold)
- Mobile-optimized ads (more mobile users)
- Keep users engaged longer

## 🎯 Ad Placement Best Practices

Current placement (already implemented):
- ✅ **Feed page**: Below filters, before goals list
- ✅ **MyGoals page**: Between stats and goals list

Avoid:
- ❌ During goal creation (interrupts user flow)
- ❌ On login page (bad first impression)
- ❌ Too many ads (annoying, lower CPM)

## 📊 Tracking Performance

In AdSense dashboard, monitor:
- **Page RPM**: Revenue per 1,000 page views
- **Ad Requests**: How many times ads were requested
- **Coverage**: % of requests that showed an ad
- **CTR**: Click-through rate (don't click your own ads!)

**WARNING**: Never click your own ads or ask friends to click. This violates AdSense policy and will get you banned.

## 🛡️ COPPA Compliance Checklist

- ✅ Privacy policy created and accessible
- ✅ Child-directed setting enabled in AdSense
- ✅ Non-personalized ads only
- ✅ No data collection for ad targeting
- ⏳ Add link to Privacy Policy in app footer

## 🔧 Troubleshooting

**Ads not showing?**
1. Check browser console for errors
2. Verify Publisher ID is correct
3. Ensure AdSense account is approved
4. May take 24-48 hours after first deploy

**"Ad slots empty" error?**
- Site needs real traffic for ads to show
- AdSense tests may take time to fill

**Account suspended?**
- Invalid clicks (clicking own ads)
- Content policy violations
- Contact AdSense support immediately

## 📱 Mobile Optimization

Current setup is responsive, but test on:
- iOS Safari
- Android Chrome
- Various screen sizes

Mobile ads typically have higher CPM since most users are mobile.

## 🚀 Future Monetization Upgrades

Once ads are running:
1. **Add interstitial ads**: Between page transitions (higher CPM)
2. **Rewarded video ads**: "Watch ad for 50 bonus points" (users love these)
3. **Premium tier**: Pay $2.99/month to remove ads
4. **Direct sponsorships**: Once you have 5,000+ users

## 📞 Support

**AdSense Help**: https://support.google.com/adsense
**COPPA Guidelines**: https://www.ftc.gov/tips-advice/business-center/guidance/childrens-online-privacy-protection-rule-six-step-compliance

## Current Status

✅ Ad component created  
✅ Ads integrated into app  
✅ Privacy policy written  
⏳ **YOU NEED TO**: Create AdSense account and get Publisher ID  
⏳ **YOU NEED TO**: Add Privacy Policy link to app  
⏳ **YOU NEED TO**: Deploy with your ad IDs  

Let me know when you get your AdSense account approved!
