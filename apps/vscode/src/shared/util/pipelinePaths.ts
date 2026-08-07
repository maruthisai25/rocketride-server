// =============================================================================
// MIT License
// Copyright (c) 2026 Aparavi Software AG
// =============================================================================

/**
 * pipelinePaths — resolution of the configured default pipeline directory.
 *
 * One implementation for every consumer of `rocketride.defaultPipelinePath`
 * (the new-pipeline command and the in-app Save dialog's preselected folder),
 * so the `${workspaceFolder}` stripping and normalization can never drift
 * between them.
 */

import { ConfigManager } from '../../config';

// =============================================================================
// RESOLUTION
// =============================================================================

/**
 * Resolves `rocketride.defaultPipelinePath` to a workspace-relative,
 * '/'-separated directory path (e.g. "pipelines" or "src/pipelines").
 *
 * The setting's default carries a `${workspaceFolder}/` prefix — stripped
 * here because every consumer roots the value at the workspace folder
 * anyway. The directory may not exist yet: consumers (the Save dialog's
 * ghost row, the host's mkdirp on save) handle creation themselves.
 *
 * @returns The relative directory ('' when the setting resolves empty).
 */
export function resolveDefaultPipelineDir(): string {
	// Fall back to the documented default when the setting is unset/empty.
	const raw = ConfigManager.getInstance().getConfig()?.defaultPipelinePath || 'pipelines';
	return raw
		.replace(/^\$\{workspaceFolder\}[/\\]?/, '')
		.replace(/\\/g, '/')
		.replace(/\/+$/, '');
}
