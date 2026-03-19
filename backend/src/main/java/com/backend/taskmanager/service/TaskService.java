package com.backend.taskmanager.service;

import com.backend.taskmanager.dto.TaskDTO;
import com.backend.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map((task)-> new TaskDTO(task.getId(),task.getTitle(),task.getDescription(),task.getStatus(),task.getCreatedAt()))
                .toList();
    }
}
