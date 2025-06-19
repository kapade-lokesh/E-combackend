class ApiResponse {
  constructor(data, message = "Operation successful") {
    this.status = "success";
    this.data = data;
    this.message = message;
  }

  toJSON() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    };
  }
}

export default ApiResponse;