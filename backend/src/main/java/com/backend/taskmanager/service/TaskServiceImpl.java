package com.backend.taskmanager.service;

import com.backend.taskmanager.config.ModelMapperConfig;
import com.backend.taskmanager.dto.TaskDTO;
import com.backend.taskmanager.exception.ResourceNotFoundException;
import com.backend.taskmanager.model.Task;
import com.backend.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository,ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
    }

   @Override
    public List<TaskDTO> getAllTasks()  {
        return taskRepository.findAll()
                .stream()
                .map((task)-> modelMapper.map(task,TaskDTO.class))
                .toList();
    }

    @Override
    public TaskDTO getTaskById(UUID id) {
        Task task =  taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        return modelMapper.map(task,TaskDTO.class);
    }

    @Override
    public TaskDTO createTask(TaskDTO task) {
        task.setCreatedAt(LocalDateTime.now());
        Task savedTask = taskRepository.save(modelMapper.map(task, Task.class));
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public TaskDTO updateTask(UUID id, TaskDTO updatedTask) {
        TaskDTO existing = getTaskById(id);

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());

        Task savedTask = taskRepository.save(modelMapper.map(existing, Task.class));
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public void deleteTask(UUID id) {
        TaskDTO task = getTaskById(id);
        taskRepository.delete(modelMapper.map(task, Task.class));
    }
}
