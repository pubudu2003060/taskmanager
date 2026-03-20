package com.backend.taskmanager.service;

import com.backend.taskmanager.dto.TaskDTO;

import java.util.List;
import java.util.UUID;

public interface TaskService {
    List<TaskDTO> getAllTasks();
    TaskDTO getTaskById(UUID id);
    TaskDTO createTask(TaskDTO task);
    TaskDTO updateTask(UUID id, TaskDTO updatedTask);
    void deleteTask(UUID id);
}
