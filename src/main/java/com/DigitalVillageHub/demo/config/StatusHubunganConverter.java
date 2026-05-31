package com.DigitalVillageHub.demo.config;

import com.DigitalVillageHub.demo.model.enums.StatusHubungan;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class StatusHubunganConverter implements AttributeConverter<StatusHubungan, String> {

    @Override
    public String convertToDatabaseColumn(StatusHubungan attribute) {
        if (attribute == null) {
            return null;
        }
        // Menyimpan ke tabel sebagai teks (e.g., "Kepala Keluarga") agar kompatibel dengan data legacy
        return attribute.getLabel(); 
    }

    @Override
    public StatusHubungan convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return null;
        }
        // Menerjemahkan dari teks legacy di database menjadi Java Enum
        return StatusHubungan.fromString(dbData.trim());
    }
}
