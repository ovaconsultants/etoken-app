import httpClient from './apiProvider';
/**
 * Logs an exception to the server
 * @param {string} description - Description of the exception
 * @param {string} platform - Platform where the error occurred (e.g., "Mobile-IOS/Android")
 * @param {string} createdBy - User or system that created the log
 */
const logException = async (description, platform = 'Mobile-IOS/Android', createdBy = 'AdminUser') => {
  try {
    await httpClient.post('/api/exception/logException', {
      exception_description: description,
      platform,
      created_by: createdBy,
    });
  } catch (error) {
    console.error('Failed to log exception:', error);
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
      params, // Query parameters
      headers, // Custom headers
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
    await logException(`GET Request Failed: ${error.message}`);
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
    console.log('endpoint in postData ', endpoint);
    console.log('data in postData', data);
    console.log('headers in postData', headers);
    const response = await httpClient.post(endpoint, data, {
      headers,
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('POST Request Failed:', {
      endpoint,
      data,
      headers,
      error: error.message,
    });

    // Log the exception
    await logException(`POST Request Failed: ${error.message}`);
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
    await logException(`DELETE Request Failed: ${error.message}`);
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
    await logException(`PATCH Request Failed: ${error.message}`);
    throw error;
  }
};
