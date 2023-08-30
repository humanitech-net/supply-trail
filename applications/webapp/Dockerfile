FROM nginx:alpine

ARG USER=humanitech
RUN adduser -D -s /sbin/nologin $USER

# Remove default nginx configurations
RUN rm -rf /etc/nginx/conf.d

# Copy the React build files to Nginx's HTML directory
COPY ./build/ /usr/share/nginx/html/

# Replace Nginx's default configuration with our custom configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R $USER .
USER $USER

EXPOSE 8880

CMD ["nginx", "-g", "daemon off;"]
