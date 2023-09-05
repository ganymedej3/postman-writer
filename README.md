# Project Name: Postman Writer

This project consists of two Node.js scripts, `write2csv.js` and `write2json.js`, designed to automate the execution of Postman collections and save the results in different formats. Additionally, it requires the use of the Microsoft Azure Translate API through RapidAPI, and this README provides instructions on how to set up and use these scripts.

## Prerequisites for write2json.js

Before running the script, you need to complete the following prerequisites:

1. **RapidAPI Key**: You must obtain a RapidAPI key to access the Microsoft Azure Translate API. To obtain the key, follow these steps:
   - Sign up for an account on [RapidAPI](https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text).
   - Subscribe to the Basic/free payment option for the Microsoft Azure Translator Text API to obtain your RapidAPI key.

2. **Postman Collection and Environment Files**: Ensure that you have the required Postman collection (`postman-writer.postman_collection.json`) and environment (`postman-writer.postman_environment.json`) files in the same directory as the scripts. These files define the API requests and configurations.

You can also get the postman collection and environment files from [Postman](https://www.postman.com/ganymede-belters/workspace/project-j3/collection/14728322-91c2fb5b-9b89-4b1a-9759-3e69fe3ad193?action=share&creator=14728322&active-environment=14728322-2eb454c6-06a4-4f28-861e-b1cc442a1bdb)

## Usage

### `write2csv.js`

This script runs a Postman collection and saves the results in CSV format. Follow these steps to run it:

1. Open your terminal.

2. Navigate to the directory containing `write2csv.js` and the required Postman files.

3. Run the script using the following command:
   ```
   node write2csv.js
   ```

### `write2json.js`

This script runs a Postman collection, retrieves and translates data using the Microsoft Azure Translate API, and saves the results in JSON format. Follow these steps to run it:

1. Open your terminal.

2. Set the environment variables `RAPIDAPI_KEY` and `DATA_FILE` before running the script. Replace `xxxx` with your RapidAPI key, and set `DATA_FILE` to the name of the data file containing test data (e.g., `jokes.csv`). Use the following command format:
   ```
   RAPIDAPI_KEY=your_rapidapi_key DATA_FILE=your_data_file.csv node write2json.js
   ```

   **Note:** Ensure that the `RAPIDAPI_KEY` is obtained as per the prerequisites mentioned above.

## Result Files

The scripts generate the following result files:

- `jokes.csv`: Contains the results of the Postman collection run in CSV format (from `write2csv.js`).

- `all_jokes_in_Spanish.json`: Contains translated data from the Postman collection run in JSON format (from `write2json.js`).

## Docker Container Usage

You can also run the Postman Collection Runner scripts within a Docker container. Here's how to do it:

1. **Build the Docker Image**: Before running the scripts, you need to build a Docker image using the provided Dockerfile. Use the following commands to build the image (replace `$IMAGE_NAME` with your desired image name):

   ```bash
   docker build --no-cache -t $IMAGE_NAME .
   docker run --rm -e DATA_FILE=${data} -e RAPIDAPI_KEY=${your_rapidapi_key} -v "$(pwd):/app" ${IMAGE_NAME}
   ```

## Important Notes

- Ensure you have Node.js installed on your machine.

- Make sure that the required Postman collection and environment files (`postman-writer.postman_collection.json` and `postman-writer.postman_environment.json`) are present in the same directory as the scripts.

- Always keep your RapidAPI key secure and do not share it publicly.

- If you encounter any issues or errors, refer to the error messages in the terminal for troubleshooting.

By following these instructions and prerequisites, you can automate the execution of Postman collections and save the results in different formats using these scripts.