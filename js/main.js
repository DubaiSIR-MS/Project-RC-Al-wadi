$(document).ready(function () {
  // Email Alert

  let loading = {
    show: function () {
      $("body").append("<div class='main-loading'></div>");
    },

    hide: function () {
      $(".main-loading").remove();
    },
  };

  // Email Sending

  $("#callback-form").submit(function () {
    let $this = $(this);
    const data = {};
    $this
      .serialize()
      .split("&")
      .forEach((element) => {
        const [key, val] = element.split("=");
        data[key] = decodeURIComponent(decodeURIComponent(val));
      });

    let params = new URLSearchParams(window.location.href);

 const url_new = new URL(window.location.href);

    const utm_source = url_new.searchParams.get("utm_source");
    const utm_medium = url_new.searchParams.get("utm_medium");
    const utm_leadsource = url_new.searchParams.get("utm_leadsource");
    const utm_campaign = url_new.searchParams.get("utm_campaign");
    const utm_term = url_new.searchParams.get("utm_term");
    const utm_content = url_new.searchParams.get("utm_content");

    var input = document.querySelector("#phone");
    var iti = window.intlTelInputGlobals.getInstance(input);
    var countryName, countryCode;

    countryCode = iti.getSelectedCountryData().dialCode;
    countryName = iti.getSelectedCountryData().name;
    
    const body = {
      from: data.email,
      to: "logdigital@sothebysrealty.ae",
      subject: "Ritz Carlton Residences - Ras Al Khaimah - Al Wadi Desert",
      message: `Full name: ${data.fullname} \nEmail: ${data.email} \nTime: ${data.time} \nDate: ${data.date} \nPhone: ${data.phone} | Country code: ${countryCode} | Country name: ${countryName} \nLanding page: Ritz-Carlton Residences - Ras Al Khaimah - Al Wadi Desert \n\nUTM Source: ${utm_source} \nUTM Medium: ${utm_medium} \nUTM Leadsource: ${utm_leadsource} \nUTM Campaign: ${utm_campaign} \nUTM Term: ${utm_term} \nUTM Content: ${utm_content} \n`
    };
    loading.show();
 
    let url =
      "https://w1brb5ayq5.execute-api.us-east-1.amazonaws.com/SendEmailFromBackend";

    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      data: objectToUrlParams(body),
      contentType: "application/x-www-form-urlencoded; charset=utf-8",

      beforeSend: function () {
        loading.show();
      },

      complete: function () {
        loading.hide();
      },

      success: function (data) {
        if (data.status == true) {
          goToward();
          $this[0].reset();
        }
      },
    });

    return false;
  });

  // Page Loading

  // $("#pageloading").introLoader({

  //     animation: {

  //         name: 'gifLoader',

  //         options: {

  //             ease: "easeInOutCirc",

  //             style: 'light',

  //             delayBefore: 500,

  //             delayAfter: 0,

  //             exitTime: 300

  //         }

  //     }

  // });

  // Date & Time Picker

  //   flatpickr(".date-picker", {
  //     altInput: true,

  //     altFormat: "d M Y",

  //     dateFormat: "d M Y",

  //     minDate: "today",
  //   });

  //   flatpickr(".time-picker", {
  //     enableTime: true,

  //     noCalendar: true,

  //     dateFormat: "H:i",

  //     time_24hr: true,

  //     minuteIncrement: 30,
  //   });

  ///////////////////////////////// Close Document Ready
});

function objectToUrlParams(obj) {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
}
