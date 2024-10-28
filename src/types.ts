const SUPPORTED_TEXT_TYPES = ['pdf', 'txt', 'html'];

const SUPPORTED_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];

const SUPPORTED_VIDEO_TYPES = ['mp4', 'webm', 'ogv'];

const SUPPORTED_AUDIO_TYPES = ['mp3', 'ogg', 'wav'];

const SUPPORTED_OFFICE_TYPES = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];

const ext = (filename: string): string => `${filename.split('.').pop()}`.toLowerCase();

export const isTextType = (filename: string): boolean => SUPPORTED_TEXT_TYPES.includes(ext(filename));

export const isImageType = (filename: string): boolean => SUPPORTED_IMAGE_TYPES.includes(ext(filename));

export const isVideoType = (filename: string): boolean => SUPPORTED_VIDEO_TYPES.includes(ext(filename));

export const isAudioType = (filename: string): boolean => SUPPORTED_AUDIO_TYPES.includes(ext(filename));

export const isOfficeType = (filename: string): boolean => SUPPORTED_OFFICE_TYPES.includes(ext(filename));

export const isTypeSupported = (filename: string): boolean => Array.of(
    ...SUPPORTED_TEXT_TYPES,
    ...SUPPORTED_IMAGE_TYPES,
    ...SUPPORTED_VIDEO_TYPES,
    ...SUPPORTED_AUDIO_TYPES,
    ...SUPPORTED_OFFICE_TYPES
).includes(ext(filename));
