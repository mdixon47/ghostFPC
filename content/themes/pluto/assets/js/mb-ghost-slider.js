//by Maciej Bobrowski :)

(function($){
    "use strict"

    function MBSlider(pElem, pLink)
    {
        this.imageArray = pElem;
        this.element = [];
        this.counterM = 0;
        this.link = pLink;
        this.leftArrow = jQuery("<div></div>");
        this.rightArrow = jQuery("<div></div>");
        this.sliderBlock = jQuery("");


        this.buildSliderHTML();

        var height = "";

        jQuery(window).resize(function(event)
        {
            event.preventDefault();
            var counter = this.counterM;


            height = this.sliderBlock.find(".inner-container img")[counter].clientHeight + "px"
            console.log(this.sliderBlock.find(".inner-container img")[counter].clientHeight + "px");
            this.sliderBlock.find(".mbSliderContent").css("height", height);

            return false;

        }.bind(this));

        jQuery(window).load(function(event)
        {
            event.preventDefault();

            height = this.sliderBlock.find(".inner-container img")[0].clientHeight + "px";
            this.sliderBlock.find(".mbSliderContent").css("height", height);

            return false;

        }.bind(this));


        this.sliderBlock.find(".inner-container")[this.counterM].classList.add("mbContentShow");
        this.sliderBlock.find(".inner-container")[this.counterM].classList.remove("mbContentHide");


        this.rightArrow.click(function(event)
        {

            event.preventDefault();
            var counter = this.counterM;

            var $innerContainer = this.sliderBlock.find(".inner-container");
            $innerContainer.siblings().each( function (index) {
                if(index == counter)
                {
                    jQuery(this).addClass("mbContentHide").removeClass("mbContentShow");
                }
            });

            this.next();

            counter = this.counterM;

            height = this.sliderBlock.find(".inner-container img")[counter].clientHeight + "px";
            this.sliderBlock.find(".mbSliderContent").css("height", height);

            $innerContainer.siblings().each( function (index) {

                if(index == counter)
                {
                    jQuery(this).addClass("mbContentShow").removeClass("mbContentHide");
                }
            });

            return false;
        }.bind(this));

        this.leftArrow.click(function(event)
        {
            event.preventDefault();
            var counter = this.counterM;

            var $innerContainer = this.sliderBlock.find(".inner-container");
            $innerContainer.siblings().each( function (index) {
                if(index == counter)
                {
                    jQuery(this).addClass("mbContentHide").removeClass("mbContentShow");
                }
            });

            this.next();

            counter = this.counterM;

            height = this.sliderBlock.find(".inner-container img")[counter].clientHeight + "px";
            this.sliderBlock.find(".mbSliderContent").css("height", height);

            $innerContainer.siblings().each( function (index) {

                if(index == counter)
                {
                    jQuery(this).addClass("mbContentShow").removeClass("mbContentHide");
                }
            });

            return false;
        }.bind(this));
    }


    MBSlider.prototype.buildElementHTML = function()
    {
        for(var i = 0; i < this.imageArray.length; ++i)
        {
            var innerContainer = jQuery("<div></div>", {class: "inner-container mbContentHide"});

            if(this.link == null)
            {
                innerContainer.append(this.imageArray[i]);
            }
            else{
                var link = jQuery("<a></a>").attr("href", this.link);
                link.append(this.imageArray[i]);
                innerContainer.append(link);
            }

            this.element.push(innerContainer);
        }
    };

    MBSlider.prototype.buildSliderHTML = function()
    {
        this.buildElementHTML();

        this.sliderBlock = jQuery("<div></div>", {class: "mbSlider-main-container"});
        this.leftArrow.addClass("left arrow fa fa-angle-left");
        this.rightArrow.addClass("right arrow fa fa-angle-right");


        this.sliderBlock.append(this.leftArrow).append($("<div></div>", {class: "mbSliderContent"})).append(this.rightArrow);

        this.sliderBlock.find(".mbSliderContent").append(this.element);

    };

    MBSlider.prototype.next = function()
    {
        ++this.counterM;

        if(this.counterM >= this.element.length)
        {
            this.counterM = 0;
        }

    };

    MBSlider.prototype.prev = function()
    {
        --this.counterM;
        if(this.counterM < 0)
        {
            this.counterM = this.element.length -1;
        }
    };


/////////////////////////////////////////////////////////
    jQuery(document).ready(function()
    {
        jQuery("article").each(function(){
            if(jQuery(this).find(".mbslider").length > 0)
            {
                var $elements = jQuery(this).find(".mbslider-source p:first-child > img");

                if($elements.length > 1)
                {
                    var link = null;
                    var $linkToPost = jQuery(this).find(".mbslider > a");
                    if($linkToPost.length > 0)
                    {
                        link = $linkToPost.attr("href");
                    }

                    $linkToPost.remove();
                    var $mbSliderTarget = jQuery(this).find('.mbslider');
                    var e = $elements;

                    $elements.remove();
                    var obj = new MBSlider(e, link);

                    jQuery($mbSliderTarget).prepend(obj.sliderBlock);
                }
            }
        });
    });
}(jQuery))