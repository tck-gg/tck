export async function getContents(file: any): Promise<string | ArrayBuffer | null> {
  const reader = new FileReader();

  return await new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Problem parsing input file.'));
    };
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsText(file);
  });
}
