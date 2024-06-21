# Stage 1: Build stage for dependencies
FROM debian:bullseye as builder

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        default-libmysqlclient-dev \
        libssl-dev

# Stage 2: Final stage for Python application
FROM python:3.9-slim

# Copy system dependencies from builder stage
COPY --from=builder /usr/lib/x86_64-linux-gnu/libssl* /usr/lib/x86_64-linux-gnu/
COPY --from=builder /usr/lib/x86_64-linux-gnu/libcrypto* /usr/lib/x86_64-linux-gnu/

# Set working directory inside the container
WORKDIR /app

# Copy application files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port if necessary
EXPOSE 8000

# Command to run the application
CMD ["python", "app.py"]
