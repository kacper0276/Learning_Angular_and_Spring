package com.example.demo.podstawy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class EventL {

    @Autowired
    private Call call;

    @Autowired
    private Call callKacper;

    @EventListener
    public void handleRefresh(ContextRefreshedEvent event) {
        call.start();
        callKacper.start();
    }
}
