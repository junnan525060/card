(function(){
    this.Notyf = function(){
      //List of notifications currently active
      this.notifications = [];

      var defaults = {
        delay:2000,
        alertIcon:'fa fa-exclamation-circle',
        confirmIcon:'fa fa-check-circle'
      }

      if (arguments[0] && typeof arguments[0] == "object"){
        this.options = extendDefaults(defaults, arguments[0]);
      }else{
        this.options = defaults;
      }

      //Creates the main notifications container
      var docFrag = document.createDocumentFragment();
      var notyfContainer = document.createElement('div');
      notyfContainer.className = 'notyf-container';
      docFrag.appendChild(notyfContainer);
      document.body.appendChild(docFrag);
      this.container = notyfContainer;

      //Stores which transitionEnd event this browser supports
      this.animationEnd = animationEndSelect();
    }

    //---------- Public methods ---------------
    /**
    * Shows an alert card
    */
    this.Notyf.prototype.alert = function(alertMessage){
      var card = buildNotificationCard.call(this, alertMessage, this.options.alertIcon);
      card.className += ' alert';
      this.container.appendChild(card);
      this.notifications.push(card);
    }

    /**
    * Shows a confirm card
    */
    this.Notyf.prototype.confirm = function(alertMessage){
      var card = buildNotificationCard.call(this, alertMessage, this.options.confirmIcon);
      card.className += ' confirm';
      this.container.appendChild(card);
      this.notifications.push(card);
    }

    //---------- Private methods ---------------

    /**
    * Populates the source object with the value from the same keys found in destination
    */
    function extendDefaults(source, destination){
      for (property in destination){
        //Avoid asigning inherited properties of destination, only asign to source the destination own properties
        if(destination.hasOwnProperty(property)){
          source[property] = destination[property];
        }
      }
      return source;
    }

    /**
    * Creates a generic card with the param message. Returns a document fragment.
    */
    function buildNotificationCard(messageText, iconClass){
      //Card wrapper
      var notification = document.createElement('div');
      notification.className = 'notyf';

      var icon = document.createElement('i');
      icon.className = iconClass;

      var message = document.createElement('div');
      message.className = 'notyf-message';
      message.innerHTML = messageText;

      //Build the card
      notification.appendChild(icon);
      notification.appendChild(message);

      var _this = this;
      setTimeout(function(){
          notification.className += " disappear";
          notification.addEventListener(_this.animationEnd, function(event){
            event.target == notification && _this.container.parentNode.removeChild(_this.container);
          });
          var index = _this.notifications.indexOf(notification);
          _this.notifications.splice(index,1);
      },_this.options.delay);

      return notification;
    }

    // Determine which animationend event is supported
    function animationEndSelect() {
      var t;
      var el = document.createElement('fake');
      var transitions = {
        'transition':'animationend',
        'OTransition':'oAnimationEnd',
        'MozTransition':'animationend',
        'WebkitTransition':'webkitAnimationEnd'
      }

      for(t in transitions){
          if( el.style[t] !== undefined ){
              return transitions[t];
          }
      }
    }

})();