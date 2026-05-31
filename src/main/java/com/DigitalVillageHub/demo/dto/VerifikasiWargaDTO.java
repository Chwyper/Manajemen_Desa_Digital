package com.DigitalVillageHub.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.DigitalVillageHub.demo.model.enums.StatusAkun;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifikasiWargaDTO {

    /**
     * Menerima nilai status verifikasi dari frontend.
     * Contoh: "VERIFIED" atau "DATA_REJECTED".
     */
    private StatusAkun statusAkun;

    /**
     * Alasan penolakan jika status akun adalah "DATA_REJECTED".
     */
    private String alasanDitolak;
}
