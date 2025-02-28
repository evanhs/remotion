import type {LogLevel} from '@remotion/renderer';
import {StudioServerInternals} from '@remotion/studio-server';
import {ConfigInternals} from './config';
import {getNumberOfSharedAudioTags} from './config/number-of-shared-audio-tags';
import {convertEntryPointToServeUrl} from './convert-entry-point-to-serve-url';
import {findEntryPoint} from './entry-point';
import {getEnvironmentVariables} from './get-env';
import {getGitSource} from './get-github-repository';
import {getInputProps} from './get-input-props';
import {getRenderDefaults} from './get-render-defaults';
import {Log} from './log';
import {parsedCli} from './parse-command-line';
import {
	addJob,
	cancelJob,
	getRenderQueue,
	removeJob,
} from './render-queue/queue';

const getPort = () => {
	if (parsedCli.port) {
		return parsedCli.port;
	}

	const serverPort = ConfigInternals.getStudioPort();
	if (serverPort) {
		return serverPort;
	}

	return null;
};

export const studioCommand = async (
	remotionRoot: string,
	args: string[],
	logLevel: LogLevel,
) => {
	const {file, reason} = findEntryPoint(args, remotionRoot, logLevel);

	Log.verbose(
		{indent: false, logLevel},
		'Entry point:',
		file,
		'reason:',
		reason,
	);

	if (!file) {
		Log.error(
			'No Remotion entrypoint was found. Specify an additional argument manually:',
		);
		Log.error('  npx remotion studio src/index.ts');
		Log.error(
			'See https://www.remotion.dev/docs/register-root for more information.',
		);
		process.exit(1);
	}

	const desiredPort = getPort();

	const fullEntryPath = convertEntryPointToServeUrl(file);

	let inputProps = getInputProps((newProps) => {
		StudioServerInternals.waitForLiveEventsListener().then((listener) => {
			inputProps = newProps;
			listener.sendEventToClient({
				type: 'new-input-props',
				newProps,
			});
		});
	}, logLevel);
	let envVariables = getEnvironmentVariables(
		(newEnvVariables) => {
			StudioServerInternals.waitForLiveEventsListener().then((listener) => {
				envVariables = newEnvVariables;
				listener.sendEventToClient({
					type: 'new-env-variables',
					newEnvVariables,
				});
			});
		},
		logLevel,
		false,
	);

	const maxTimelineTracks = ConfigInternals.getMaxTimelineTracks();
	const keyboardShortcutsEnabled =
		ConfigInternals.getKeyboardShortcutsEnabled();

	const gitSource = getGitSource(remotionRoot);

	await StudioServerInternals.startStudio({
		previewEntry: require.resolve('@remotion/studio/entry'),
		browserArgs: parsedCli['browser-args'],
		browserFlag: parsedCli.browser,
		logLevel,
		configValueShouldOpenBrowser: ConfigInternals.getShouldOpenBrowser(),
		fullEntryPath,
		getCurrentInputProps: () => inputProps,
		getEnvVariables: () => envVariables,
		desiredPort,
		keyboardShortcutsEnabled,
		maxTimelineTracks,
		remotionRoot,
		userPassedPublicDir: ConfigInternals.getPublicDir(),
		webpackOverride: ConfigInternals.getWebpackOverrideFn(),
		poll: ConfigInternals.getWebpackPolling(),
		getRenderDefaults,
		getRenderQueue,
		numberOfAudioTags:
			parsedCli['number-of-shared-audio-tags'] ?? getNumberOfSharedAudioTags(),
		queueMethods: {
			addJob,
			cancelJob,
			removeJob,
		},
		// Minimist quirk: Adding `--no-open` flag will result in {['no-open']: false, open: true}
		// @ts-expect-error
		parsedCliOpen: parsedCli.open,
		gitSource,
	});
};
