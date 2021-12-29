/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import ToolsMoreMenuGroup from '../components/header/tools-more-menu-group';
import SiteExport from './site-export';
import KeyboardShortcutsHelpMenuItem from './keyboard-shortcut-help-menu-item';
import WelcomeGuideMenuItem from './welcome-guide-menu-item';

registerPlugin( 'edit-site', {
	render() {
		return (
			<>
				<ToolsMoreMenuGroup>
					<SiteExport />
					<KeyboardShortcutsHelpMenuItem />
					<WelcomeGuideMenuItem />
				</ToolsMoreMenuGroup>
			</>
		);
	},
} );
