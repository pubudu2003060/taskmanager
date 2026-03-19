package com.backend.taskmanager.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    private UUID id;

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Status status;

    private LocalDateTime createdAt;


}
