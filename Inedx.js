 <script>
        const allowedCountries = ["AU", "BR"];
        const redirectUrl = "https://clshcod.blogspot.com/?m=1";

        function handleCountry(country) {
            if (allowedCountries.includes(country)) {
                // Show content directly if the user is from AU or BR
                document.getElementById("main-content").style.display = "flex";
                document.getElementById("page-footer").style.display = "flex";
            } else {
                // Redirect silently
                window.location.replace(redirectUrl);
            }
        }

        function tryProvider1() {
            fetch("https://ipapi.co/json/")
                .then(res => res.json())
                .then(data => handleCountry(data.country_code))
                .catch(tryProvider2);
        }

        function tryProvider2() {
            fetch("https://ipwho.is/")
                .then(res => res.json())
                .then(data => handleCountry(data.country_code))
                .catch(tryProvider3);
        }

        function tryProvider3() {
            fetch("https://get.geojs.io/v1/ip/country.json")
                .then(res => res.json())
                .then(data => handleCountry(data.country))
                .catch(function () {
                    // Fallback redirect on full failure
                    window.location.replace(redirectUrl);
                });
        }

        // Execute in background immediately
        tryProvider1();
    </script>
