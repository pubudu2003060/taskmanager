package com.backend.taskmanager.dto;

import com.backend.taskmanager.model.Task;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    private String title;

    private String description;

    private String status;

    private LocalDateTime createdAt;


}
