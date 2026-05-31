package com.DigitalVillageHub.demo.controller;

import com.DigitalVillageHub.demo.model.dto.AjukanSuratRequestDTO;
import com.DigitalVillageHub.demo.model.entity.Surat;
import com.DigitalVillageHub.demo.model.entity.User;
import com.DigitalVillageHub.demo.persistence.UserRepository;
import com.DigitalVillageHub.demo.service.SuratService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/surat", "/api/v1/warga/surat"})
@RequiredArgsConstructor
public class SuratController {

    private final SuratService suratService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getAllSurat() {
        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", suratService.getAllSurat()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSuratById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "data", suratService.getSuratById(id)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSuratByUserId(
            @PathVariable Long userId,
            Authentication authentication
    ) {
        Long tokenUserId = Long.parseLong(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!userId.equals(tokenUserId) && !isAdmin) {
            return ResponseEntity.status(403).body(Map.of(
                    "success", false,
                    "message", "Akses ditolak"
            ));
        }

        return ResponseEntity.ok(Map.of(
                "success", true,
                "data", suratService.getSuratByUserId(userId)
        ));
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createSurat(
            @PathVariable Long userId,
            @RequestBody Surat surat,
            Authentication authentication
    ) {
        Long tokenUserId = Long.parseLong(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!userId.equals(tokenUserId) && !isAdmin) {
            return ResponseEntity.status(403).body(Map.of(
                    "success", false,
                    "message", "Akses ditolak"
            ));
        }

        try {
            return ResponseEntity.status(201).body(Map.of(
                    "success", true,
                    "message", "Pengajuan surat berhasil dibuat",
                    "data", suratService.createSurat(userId, surat)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @PostMapping("/ajukan")
    public ResponseEntity<?> handleAjukanSurat(
            @RequestBody AjukanSuratRequestDTO requestDTO,
            Authentication authentication
    ) {
        Long tokenUserId = Long.parseLong(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        User user = userRepository.findById(tokenUserId)
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));

        if (!user.getNik().equals(requestDTO.getNik()) && !isAdmin) {
            return ResponseEntity.status(403).body(Map.of(
                    "success", false,
                    "message", "Akses ditolak"
            ));
        }

        try {
            Surat savedSurat = suratService.ajukanSuratWarga(requestDTO);

            HashMap<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Permohonan surat resmi berhasil diajukan!");
            response.put("data", savedSurat);

            return ResponseEntity.status(201).body(response);
        } catch (RuntimeException e) {
            HashMap<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());

            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request
    ) {
        try {
            Surat.StatusSurat status = Surat.StatusSurat.valueOf(request.get("status"));
            String alasanDitolak = request.get("alasan_ditolak");

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Status surat berhasil diperbarui",
                    "data", suratService.updateStatus(id, status, alasanDitolak)
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSurat(@PathVariable Long id) {
        try {
            suratService.deleteSurat(id);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Surat berhasil dihapus"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", e.getMessage()
            ));
        }
    }
}