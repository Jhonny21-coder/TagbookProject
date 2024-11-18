package com.example.application.data;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.LocalDateTime;

import java.util.List;

@Entity
public class Reply {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @ManyToOne
     @JoinColumn(name = "replier_id")
     private User replier;

     private String reply;

     @ManyToOne
     @JoinColumn(name = "comment_id")
     private Comment comment;

     private LocalDateTime dateTimePosted;

     @Convert(converter = StringListConverter.class)
     @Column(name = "mentioned_names", nullable = false)
     private List<String> mentionedNames;

     public Long getId(){
     	return id;
     }

     public void setId(Long id){
     	this.id = id;
     }

     public void setReply(String reply){
        this.reply = reply;
     }

     public void setReplier(User replier){
     	this.replier = replier;
     }

     public User getReplier(){
        return replier;
     }

     public String getReply(){
        return reply;
     }

     public Comment getComment(){
     	return comment;
     }

     public void setComment(Comment comment){
     	this.comment = comment;
     }

     public LocalDateTime getDateTimePosted(){
     	return dateTimePosted;
     }

     public void setDateTimePosted(LocalDateTime dateTimePosted){
     	this.dateTimePosted = dateTimePosted;
     }

     public List<String> getMentionedNames(){
     	return mentionedNames;
     }

     public void setMentionedNames(List<String> mentionedNames){
     	this.mentionedNames = mentionedNames;
     }
}
