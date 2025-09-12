export default defineNuxtPlugin(() => {
  if (process.client) {
    window.loadProSeal = function () {
      window.provenExpert.proSeal({
        widgetId: "7777fc26-1932-414f-a303-3e2f6d731d4b",
        language: "de-DE",
        usePageLanguage: false,
        bannerColor: "#097E92",
        textColor: "#FFFFFF",
        showReviews: true,
        hideDate: true,
        hideName: false,
        hideOnMobile: false,
        bottom: "30px",
        stickyToSide: "right",
        googleStars: true,
        zIndex: "9999",
        displayReviewerLastName: false,
      })
    }

    const script = document.createElement("script")
    script.src = "https://s.provenexpert.net/seals/proseal-v2.js"
    script.onload = () => window.loadProSeal()
    document.body.appendChild(script)
  }
})
