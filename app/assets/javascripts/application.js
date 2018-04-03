// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require jquery
//= require jquery_ujs
//= require serviceworker-companion

$(document).ready(function(){
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworker.js', { scope: './' })
      .then(function(reg) {
        alert('[Companion]', 'Service worker registered!');
      }).catch((error) => {
        alert("1x"+ error.toString())
      });
  }

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  
  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    alert("Permission to receive notifications has been granted");
  }
  
  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    alert("1");
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        alert("Permission to receive notifications has been granted");
      }
    });
  }

  // var a = new Uint8Array("AAAANEcTPdI:APA91bFFLVtxHzcmwnESP53jX-AXH0f4rChgohE3vr9eCoZYA_toeSDV5b-alj7MYCRsdr_RF70ZElegtWCA5etWgbeEefhQBwsSjOF9FZkkXokHQvyQDKRsz68fI61MHDHSWgdV3xwW")
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    alert(123);
    serviceWorkerRegistration.pushManager
    .subscribe({
      userVisibleOnly: true
    }).then((subscription)=>{
      console.log('Subscription successfull', subscription.endpoint)
    }).catch((error) => {
      console.log("Subscription error", error)
    })
  });

  $(".webpush-button").on("click", (e) => {
    navigator.serviceWorker.ready
    .then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager.getSubscription()
      .then((subscription) => {
        // alert(1231231)
        $.post("/push", { subscription: subscription.toJSON(), message: "You clicked a button!" });
      }).catch((error) => {
        alert('Error1', error)
      });
    }).catch((error) => {
      alert("Error2", error);
    });
  });  
})
