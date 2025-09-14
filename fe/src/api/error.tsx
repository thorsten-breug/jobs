export const errorMessage = (response: Response) => Promise.resolve(response.statusText).then((message) => {
    return message || response.text().then((message) => message || 'Unknown Error!');
});
