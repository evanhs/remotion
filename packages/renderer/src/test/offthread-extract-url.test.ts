import {expect, test} from 'vitest';
import {extractUrlAndSourceFromUrl} from '../offthread-video-server';

test('Extract URL correctly', () => {
	expect(
		extractUrlAndSourceFromUrl(
			'/proxy?src=http%3A%2F%2Flocalhost%3A3000%2Fpublic%2Fframermp4withoutfileextension&time=1.3',
		),
	).toEqual({
		src: 'http://localhost:3000/public/framermp4withoutfileextension',
		time: 1.3,
		transparent: false,
	});

	expect(
		extractUrlAndSourceFromUrl(
			'/proxy?src=http%3A%2F%2Flocalhost%3A3000%2Fpublic%2Fframermp4withoutfileextension&time=1.3&transparent=true',
		),
	).toEqual({
		src: 'http://localhost:3000/public/framermp4withoutfileextension',
		time: 1.3,
		transparent: true,
	});
});
