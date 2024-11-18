package com.example.application.data;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Converter
public class StringListConverter implements AttributeConverter<List<String>, String> {

    // Method to convert a List<String> attribute to a String for database storage
    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        // Check if the attribute is null or empty
        if (attribute == null || attribute.isEmpty()) {
            // If so, return null to represent an empty database column
            return null;
        }
        // Join the List<String> elements into a comma-separated String
        return String.join(",", attribute);
    }

    // Method to convert a String from the database to a List<String> attribute
    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        // Check if the database String is null or empty
        if (dbData == null || dbData.isEmpty()) {
            // If so, return an empty list
            return Collections.emptyList();
        }
        // Split the String by commas to convert it back to a List<String>
        return Arrays.asList(dbData.split(","));
    }
}
