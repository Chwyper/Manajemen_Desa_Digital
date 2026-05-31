package com.DigitalVillageHub.demo.model.enums;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

public enum StatusHubungan {
    @JsonProperty("Kepala Keluarga")
    KEPALA_KELUARGA("Kepala Keluarga"),
    
    @JsonProperty("Istri")
    ISTRI("Istri"),
    
    @JsonProperty("Anak")
    ANAK("Anak"),
    
    @JsonProperty("Anggota Keluarga")
    ANGGOTA_KELUARGA("Anggota Keluarga");

    private final String label;

    StatusHubungan(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    public static StatusHubungan fromString(String text) {
        if (text == null) {
            return null;
        }
        for (StatusHubungan b : StatusHubungan.values()) {
            if (b.label.equalsIgnoreCase(text)) {
                return b;
            }
        }
        return null;
    }
}
