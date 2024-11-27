package com.example.application.views;

import com.vaadin.flow.component.Component;

public class CustomEvent {


    public static void handleLongPressEvent(Component component) {
        String jsCode = """
            let pressTimer, startX, startY;

            $0.addEventListener('touchstart', function(e) {
            	startX = e.touches[0].clientX;
            	startY = e.touches[0].clientY;

            	pressTimer = setTimeout(function() {
            	   $0.dispatchEvent(new CustomEvent('long-press'));
            	}, 500);
            }, false);

            $0.addEventListener('touchend', function(e) {
            	clearTimeout(pressTimer);
            }, false);

            $0.addEventListener('touchmove', function(e) {
               let moveX = e.touches[0].clientX - startX;
               let moveY = e.touches[0].clientY - startY;
               if (Math.abs(moveX) > 5 || Math.abs(moveY) > 5) {
                   clearTimeout(pressTimer);
               }
            }, false);
        """;

        component.getElement().executeJs(jsCode, component.getElement());
   }

   public static void handleScrollEvent(Component component) {
        String jsCode = """
            var loaded = false;

            $0.addEventListener('scroll', function() {
                let scrollPosition = $0.scrollTop;
                let scrollHeight = $0.scrollHeight;
                let clientHeight = $0.offsetHeight;
                let threshold = 0.7;

                if (isScrollThresholdReached(scrollPosition, scrollHeight, clientHeight, threshold) && !loaded) {
                    loaded = true;
                    const event = new CustomEvent('scroll-to-bottom');
                    $0.dispatchEvent(event);
                }

                if (isScrollThresholdExited(scrollPosition, scrollHeight, clientHeight, threshold)) {
                    loaded = false;
                }
            }, false);

            function isScrollThresholdReached(scrollPosition, scrollHeight, clientHeight, threshold) {
                return scrollPosition / (scrollHeight - clientHeight) >= threshold;
            }

            function isScrollThresholdExited(scrollPosition, scrollHeight, clientHeight, threshold) {
                return scrollPosition / (scrollHeight - clientHeight) < threshold;
           }
        """;

        component.getElement().executeJs(jsCode);
    }
}
