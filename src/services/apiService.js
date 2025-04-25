import httpClient from './apiProvider';
import { Platform, NativeModules } from 'react-native';
/**
 * Logs exceptions to the server with enhanced debugging information
 * @param {string} description - Human-readable error description
 * @param {Error|null} error - Original error object (optional)
 * @param {object|null} context - Additional context data (optional)
 * @param {string} platform - Platform identifier (auto-detected)
 * @param {string} createdBy - Identifying who triggered the log
 * @returns {Promise<void>}
 */


/**
 * Logs exceptions to the server with enhanced debugging information
 * @param {string} description - Human-readable error description
 * @param {Error|null} error - Original error object (optional)
 * @param {object|null} context - Additional context data (optional)
 * @param {string} platform - Platform identifier (auto-detected)
 * @param {string} createdBy - Identifying who triggered the log
 * @returns {Promise<void>}
 */
const logException = async (
  description,
  error = null,
  context = null,
  platform = Platform.OS === 'ios' ? 'Mobile-IOS' : 'Mobile-Android',
  createdBy = 'AdminUser',
) => {
  // Get device model from native modules
  let deviceModel = 'unknown';
  try {
    deviceModel = Platform.OS === 'ios' 
      ? NativeModules.PlatformConstants.localizedModel 
      : NativeModules.DeviceInfo?.model || 'unknown';
  } catch (e) {
    console.warn('Could not get device model:', e);
  }

  // Construct comprehensive payload
  const payload = {
    exception_description: description,
    platform,
    created_by: createdBy,
    timestamp: new Date().toISOString(),
    device_info: {
      os_version: Platform.Version,
      os: Platform.OS,
      device_model: deviceModel,
      app_version: NativeModules.SettingsManager?.settings.AppVersion || 
                  NativeModules.I18nManager?.localeIdentifier || 
                  'unknown',
    },
    ...(error && {
      error_details: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...(error.response && {
          response_status: error.response?.status,
          response_data: error.response?.data,
        }),
        ...(error.config && {
          request_url: error.config?.url,
          request_method: error.config?.method,
          request_data: error.config?.data,
        }),
      },
    }),
    ...(context && { context }),
  };

  try {
    console.debug('[ExceptionLogger] Sending error payload:', payload);
    const response = await httpClient.post('/exception/logException', payload, {
      timeout: 5000,
    });
    console.debug('[ExceptionLogger] Successfully logged exception');
  } catch (loggingError) {
    console.error(
      '[ExceptionLogger] Failed to submit error to server',
      '\nOriginal Error:', error,
      '\nLogging Error:', loggingError,
      '\nContext:', context,
      '\nAttempted Payload:', payload
    );
  }
};
/**
 * Generic function to handle GET requests with queries and headers
 * @param {string} endpoint - The API endpoint
 * @param {object} params - Query parameters (optional)
 * @param {object} headers - Custom headers (optional)
 * @returns {Promise} - The response data
 */
export const fetchData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await httpClient.get(endpoint, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('GET Request Failed:', {
      endpoint,
      params,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(
      `GET Request Failed: ${error.message} at this endpoint: ${endpoint}`,
    );
    throw error;
  }
};

/**
 * Generic function to handle POST requests with body data and headers
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request body data
 * @param {object} headers - Custom headers (optional)
 * @returns {Promise} - The response data
 */
export const postData = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await httpClient.post(endpoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('POST Request Failed:', {
      endpoint,
      data,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(
      `POST Request Failed: ${error.message} at this endpoint: ${endpoint}`,
    );
    throw error;
  }
};

/**
 * Generic function to handle PUT requests with body data and headers
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request body data
 * @param {object} headers - Custom headers (optional)
 * @returns {Promise} - The response data
 */
export const putData = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await httpClient.put(endpoint, data, {
      headers, // Custom headers
    });
    return response.data;
  } catch (error) {
    console.error('PUT Request Failed:', {
      endpoint,
      data,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(`PUT Request Failed: ${error.message}`);
    throw error;
  }
};

/**
 * Generic function to handle DELETE requests with queries and headers
 * @param {string} endpoint - The API endpoint
 * @param {object} params - Query parameters (optional)
 * @param {object} headers - Custom headers (optional)
 * @returns {Promise} - The response data
 */
export const deleteData = async (endpoint, params = {}, headers = {}) => {
  try {
    const response = await httpClient.delete(endpoint, {
      params, // Query parameters
      headers, // Custom headers
    });
    return response.data;
  } catch (error) {
    console.error('DELETE Request Failed:', {
      endpoint,
      params,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(
      `DELETE Request Failed: ${error.message} at this endpoint: ${endpoint}`,
    );
    throw error;
  }
};

/**
 * Generic function to handle PATCH requests with body data and headers
 * @param {string} endpoint - The API endpoint
 * @param {object} data - The request body data
 * @param {object} headers - Custom headers (optional)
 * @returns {Promise} - The response data
 */

export const patchData = async (endpoint, data = {}, headers = {}) => {
  try {
    const response = await httpClient.patch(endpoint, data, {
      headers, // Custom headers
    });
    return response.data;
  } catch (error) {
    console.error('PATCH Request Failed:', {
      endpoint,
      data,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(
      `PATCH Request Failed: ${error.message} at this endpoint: ${endpoint}`,
    );
    throw error;
  }
};
