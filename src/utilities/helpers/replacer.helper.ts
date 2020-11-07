declare global {
    interface String {
        replaceAll(search: any, replacement: string): string;
    }
}

String.prototype.replaceAll = function (search, replacement) {
  let target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

export const replaceAll = (str: string, object: any) => {
  for (let property in object) {
    if (object.hasOwnProperty(property)) {
      str = str.replaceAll(property, object[property]);
    }
  }
  return str;
}