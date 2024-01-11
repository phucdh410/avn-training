#Frontend (ReactJS)

I. Cấu trúc của backend bao gồm:

-   **root** (nơi đang đứng): bao gồm các file config như package.json, .env, cli, ...
-   **build**: nơi chứa source code sau khi build
-   **mock**: nơi chứa mock data của ứng dụng
-   **public**: nơi chứa các file public như ảnh, video, font ...
-   **src**: nơi chứa toàn bộ source code, xử lý logic

II. Start ứng dụng

1. Install các package cần thiết ( **npm install ** hoặc **yarn install **)
2. Tạo file **.env** ở thư mục ** root** bao gồm các thông số như sau:

-   **REACT_APP_VERSION**: Version ứng dụng đang chạy (hiện tại là v1)

3. Tạo file **.env.development** và **.env.production** bao gồm các thông số như sau: -**REACT_APP_API_URL**: Đường dẫn API của Backend

-   **REACT_APP_WEB_URL**: Đường dẫn của WEB

4. Start ứng dụng:

-   Môi trường dev: **npm start**
-   Môi trường production: **npm start**

5. Build ứng dụng ra static file: **npm run build**
