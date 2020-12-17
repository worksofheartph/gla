    var contact = document.querySelector("#contact");
    var mobileMenu = document.querySelector("#menuToggle input");
    
    document.querySelector(".contact-toggle").addEventListener("click", function(e) {
    e.preventDefault();
    contact.classList.toggle("toggled");
    window.scrollTo({top: 0, behavior: 'smooth'});
    });
    var mobileMenuToggled = false;
    mobileMenu.addEventListener("click", toggleMobileMenu);
    mobileMenu.addEventListener("tap", toggleMobileMenu);
    function toggleMobileMenu(e) {
    mobileMenuToggled = !mobileMenuToggled;
    document.body.style.overflowY = mobileMenuToggled ? "hidden" : "auto";
    }

      (function() {
        function Pagination(container) {
          var element;
          var pages = [];
          return {
            init: function(flicking) {
              element = document.querySelector(container);
              flicking.getAllPanels().forEach(function(_, i) {
                var page = document.createElement("div");
                page.classList.add("page");
                page.addEventListener("click", function() {
                  flicking.moveTo(i);
                });
                element.appendChild(page);
                pages.push(page);
              });
              flicking.on("moveEnd", this.update.bind(this, flicking));
              this.update(flicking);
            },
            update: function(flicking) {
              var currPage = element.querySelector(".current");
              if (currPage) {
                currPage.classList.remove("current");
              }
              pages[flicking.getIndex()].classList.add("current");
            }
          }
        }
        function AutoPlay(duration) {
          var timeout;
          return {
            init: function(flicking) {
              flicking.on("moveStart", this.resetTimeout.bind(this, flicking));
              this.next(flicking);
            },
            next: function(flicking) {
              timeout = setTimeout(function() {
                flicking.next();
              }, duration);
              return timeout;
            },
            resetTimeout: function(flicking) {
              clearTimeout(timeout);
              timeout = this.next(flicking);
            }
          }
        }
        var flicking = new eg.Flicking(".testimonials", { circular: true });
        flicking.addPlugins([
          Pagination(".testimonials-pagination"),
          AutoPlay(3000),
        ]);
      })();
  