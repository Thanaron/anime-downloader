import { Theme } from '../types/types';
import logger from '@/common/utils/logger';

const fs = require('fs');
const path = require('path');

const basePath = process.env.BASE_URL;

class ApplicationTheme {
    static set(theme: Theme) {
        logger.debug('Attempting to apply theme: %j', theme);
        ApplicationTheme.removeExistingThemeIfNeeded();

        const themeInDirectory = path.join(basePath, 'themes', theme.file);

        logger.debug('Creating theme element %s', themeInDirectory);
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = themeInDirectory;
        link.id = 'theme';
        document.getElementsByTagName('head')[0].appendChild(link);

        if (document.getElementById('theme') != null) {
            logger.info('Successfully attached new theme');
        } else {
            logger.error('Unable to attach new theme');
        }
    }

    private static removeExistingThemeIfNeeded() {
        const element = ApplicationTheme.getCurrentThemeElement();
        logger.info('Removing existing theme');
        if (element !== null && element.parentElement !== null) {
            element.parentElement.removeChild(element);
            logger.debug('Existing theme removed');
        } else {
            logger.warn('Unable to remove existing theme');
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
