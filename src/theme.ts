import { Theme } from './types/types';
import logger from './utils/logger';

const fs = require('fs');
const path = require('path');

const basePath = process.env.BASE_URL;

class ApplicationTheme {
    static set(theme: Theme) {
        ApplicationTheme.removeExistingThemeIfNeeded();

        const themeInDirectory = path.join(basePath, 'themes', theme.file);

        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = themeInDirectory;
        link.id = 'theme';
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    private static removeExistingThemeIfNeeded() {
        const element = ApplicationTheme.getCurrentThemeElement();
        if (element !== null && element.parentElement !== null) {
            element.parentElement.removeChild(element);
        }
    }

    private static getCurrentThemeElement(): HTMLElement | null {
        return document.getElementById('theme');
    }

    static getAvailableThemes(): Theme[] {
        const themes: Theme[] = [];

        fs.readdir(
            path.join(basePath, 'themes'),
            (err: any, items: string[]) => {
                if (err) {
                    logger.error(err.message);
                    return;
                }

                items.forEach((item: string) => {
                    const name = item.substring(0, item.length - 4);
                    themes.push({ name, file: item });
                });
            }
        );
        return themes;
    }
}

export default ApplicationTheme;
