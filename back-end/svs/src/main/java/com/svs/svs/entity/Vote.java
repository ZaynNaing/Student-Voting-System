package com.svs.svs.entity;

import jakarta.persistence.*;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long poliyId;

    @Column
    private Long userId;

    @Column
    private String type;
    
    public Vote(Long poliyId, Long userId, String type) {
        this.poliyId = poliyId;
        this.userId = userId;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPoliyId() {
        return poliyId;
    }

    public void setPoliyId(Long poliyId) {
        this.poliyId = poliyId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
