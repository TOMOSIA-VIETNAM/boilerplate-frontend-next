import { api } from '@/utils/api'
import { ApiResponse } from '@/types/api'

// Common types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  uptime: number
  version: string
  environment: string
}

export interface FileUploadResponse {
  url: string
  filename: string
  size: number
  mimeType: string
}

export interface SystemInfo {
  version: string
  environment: string
  database: {
    status: 'connected' | 'disconnected'
    version: string
  }
  cache: {
    status: 'connected' | 'disconnected'
    type: string
  }
}

// Common service class
export class CommonService {
  // Health check
  static async healthCheck(): Promise<ApiResponse<HealthCheckResponse>> {
    return api.get<HealthCheckResponse>('/health')
  }

  // Get system information
  static async getSystemInfo(): Promise<ApiResponse<SystemInfo>> {
    return api.get<SystemInfo>('/system/info')
  }

  // Upload file
  static async uploadFile(file: File, folder?: string): Promise<ApiResponse<FileUploadResponse>> {
    const url = folder ? `/upload?folder=${folder}` : '/upload'
    return api.upload<FileUploadResponse>(url, file)
  }

  // Upload multiple files
  static async uploadFiles(files: File[], folder?: string): Promise<ApiResponse<FileUploadResponse[]>> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    if (folder) {
      formData.append('folder', folder)
    }

    const response = await api.post<FileUploadResponse[]>('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  }

  // Delete file
  static async deleteFile(filename: string): Promise<ApiResponse<void>> {
    return api.delete<void>(`/upload/${filename}`)
  }

  // Get file info
  static async getFileInfo(filename: string): Promise<ApiResponse<FileUploadResponse>> {
    return api.get<FileUploadResponse>(`/upload/${filename}`)
  }

  // Download file
  static async downloadFile(filename: string): Promise<void> {
    await api.download(`/upload/${filename}`, filename)
  }

  // Get server time
  static async getServerTime(): Promise<ApiResponse<{ timestamp: string; timezone: string }>> {
    return api.get<{ timestamp: string; timezone: string }>('/time')
  }

  // Send feedback
  static async sendFeedback(data: {
    type: 'bug' | 'feature' | 'general'
    subject: string
    message: string
    email?: string
  }): Promise<ApiResponse<void>> {
    return api.post<void>('/feedback', data)
  }

  // Get app configuration
  static async getConfig(): Promise<
    ApiResponse<{
      features: Record<string, boolean>
      limits: Record<string, number>
      settings: Record<string, unknown>
    }>
  > {
    return api.get('/config')
  }

  // Clear cache
  static async clearCache(): Promise<ApiResponse<void>> {
    return api.post<void>('/cache/clear')
  }

  // Get cache stats
  static async getCacheStats(): Promise<
    ApiResponse<{
      hits: number
      misses: number
      keys: number
      memory: number
    }>
  > {
    return api.get('/cache/stats')
  }
}
