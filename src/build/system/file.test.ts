import { createFolder, folderExists, fileExists, getFile } from './file'; // Replace 'yourModule' with the correct path to your module
import { mkdir, stat, readFile } from 'fs/promises';
import { readFile as readFileOriginal, existsSync } from 'fs';
import { defaultSettings } from '@/build/settings';

jest.mock('fs/promises');
jest.mock('fs');

describe('createFolder', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should create folder with given path', async () => {
    const path = '/path/to/folder';

    // Mocking the successful mkdir call
    (mkdir as jest.Mock).mockResolvedValueOnce({});

    await createFolder(path);

    expect(mkdir).toHaveBeenCalledWith(path, { recursive: true });
  });

  xit('should handle errors when creating folder', async () => {
    const path = '/path/to/folder';
    const error = new Error('Folder creation failed');

    // Mocking the mkdir to throw an error
    (mkdir as jest.Mock).mockRejectedValueOnce(error);

    console.error = jest.fn(); // Mock console.error

    await createFolder(path);

    expect(console.error).toHaveBeenCalledWith(error);
  });
});


describe('folderExists', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should return true if folder exists at the given path', async () => {
    const path = '/path/to/existing/folder';

    // Mocking the stat to return a valid stats object
    (stat as jest.Mock).mockResolvedValueOnce({
      isDirectory: () => true, // Simulating that the path is a directory
    });

    const result = await folderExists(path);

    expect(stat).toHaveBeenCalledWith(path);
    expect(result).toBe(true);
  });

  xit('should return false if folder does not exist at the given path', async () => {
    const path = '/path/to/nonexisting/folder';

    // Mocking the stat to throw an error
    (stat as jest.Mock).mockRejectedValueOnce(new Error('Folder does not exist'));

    const result = await folderExists(path);

    expect(stat).toHaveBeenCalledWith(path);
    expect(result).toBe(false);
  });

  xit('should return false if path points to a file instead of a folder', async () => {
    const path = '/path/to/file.txt';

    // Mocking the stat to return a stats object indicating it's not a directory
    (stat as jest.Mock).mockResolvedValueOnce({
      isDirectory: () => false, // Simulating that the path is not a directory (it's a file)
    });

    const result = await folderExists(path);

    expect(stat).toHaveBeenCalledWith(path);
    expect(result).toBe(false);
  });
});


describe('fileExists', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should return true if file exists at the given path', async () => {
    const path = '/path/to/existing/file.txt';

    // Mocking the readFile to resolve (indicating the file exists)
    (readFile as jest.Mock).mockResolvedValueOnce('');

    const result = await fileExists(path);

    expect(readFile).toHaveBeenCalledWith(path, 'utf-8');
    expect(result).toBe(true);
  });

  xit('should return false if file does not exist at the given path', async () => {
    const path = '/path/to/nonexisting/file.txt';

    // Mocking the readFile to reject (indicating the file does not exist)
    (readFile as jest.Mock).mockRejectedValueOnce(new Error('File does not exist'));

    const result = await fileExists(path);

    expect(readFile).toHaveBeenCalledWith(path, 'utf-8');
    expect(result).toBe(false);
  });
});


describe('getFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  xit('should return file data if file exists at the given path', async () => {
    const path = '/path/to/existing/3M_My file.svg';
    const fileContent = 'This is the content of the file.';

    // Mocking the readFile to resolve with file content
    (readFile as jest.Mock).mockResolvedValueOnce(fileContent);
    (existsSync as jest.Mock).mockReturnValueOnce(true);


    const result = await getFile(path, { files: [], templates: {}, errors: [], settings: defaultSettings });


    expect(readFile).toHaveBeenCalledWith(path, 'utf-8');
    expect(result.data.name).toBe('3M_My file.svg');
    expect(result.data.path).toBe(path);
    expect(result.data.content).toBe(fileContent);
    // expect(result.data.extension).toBe('txt');
    expect(result.error).toHaveLength(0);
  });
  xit('should return error if file does not exist at the given path', async () => {
    const path = '/path/to/nonexisting/file.txt';

    // Mocking the fileExists to return false (indicating file doesn't exist)
    (existsSync as jest.Mock).mockReturnValueOnce(false);

    const result = await getFile(path, { errors: [], templates: {}, files: [], settings: defaultSettings });

    expect(existsSync).toHaveBeenCalledWith(path);
    expect(result.data).toBeUndefined();
    expect(result.error).toContain(`File does not exist: ${path}`);
  });

  xit('should return error if error occurs while reading file', async () => {
    const path = '/path/to/existing/file.txt';
    const errorMessage = 'Error reading file';

    // Mocking the readFile to reject with an error
    (readFileOriginal as unknown as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));
    (existsSync as jest.Mock).mockReturnValueOnce(true);

    const result = await getFile(path, { files: [], templates: {}, errors: [], settings: defaultSettings });

    expect(readFileOriginal).toHaveBeenCalledWith(path, 'utf-8');
    expect(result.data).toBeUndefined();
    expect(result.error).toContain(`Error reading file: ${path}`);
  });
});