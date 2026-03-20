package com.backend.taskmanager.service;

import com.backend.taskmanager.dto.TaskDTO;
import com.backend.taskmanager.exception.ResourceNotFoundException;
import com.backend.taskmanager.model.Status;
import com.backend.taskmanager.model.Task;
import com.backend.taskmanager.model.User;
import com.backend.taskmanager.repository.TaskRepository;
import com.backend.taskmanager.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        UUID userId = getAuthenticatedUserId();
        return taskRepository.findByUserId(userId)
                .stream()
                .map(task -> modelMapper.map(task, TaskDTO.class))
                .toList();
    }

    @Override
    public TaskDTO getTaskById(UUID id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        UUID userId = getAuthenticatedUserId();
        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        return modelMapper.map(task, TaskDTO.class);
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        User user = getAuthenticatedUser();

        Task task = modelMapper.map(taskDTO, Task.class);
        task.setUser(user);

        if (task.getStatus() == null) {
            task.setStatus(Status.TO_DO);
        }

        Task savedTask = taskRepository.save(task);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public TaskDTO updateTask(UUID id, TaskDTO updatedTask) {
        Task existing = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        UUID userId = getAuthenticatedUserId();
        if (!existing.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        existing.setTitle(updatedTask.getTitle());
        existing.setDescription(updatedTask.getDescription());
        existing.setStatus(updatedTask.getStatus());

        Task savedTask = taskRepository.save(existing);
        return modelMapper.map(savedTask, TaskDTO.class);
    }

    @Override
    public void deleteTask(UUID id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        UUID userId = getAuthenticatedUserId();
        if (!task.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Task not found with id: " + id);
        }

        taskRepository.deleteById(id);
    }

    private UUID getAuthenticatedUserId() {
        return getAuthenticatedUser().getId();
    }

    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));
    }
}
