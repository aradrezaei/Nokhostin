// lib/getBlurDataURL.js
import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

export async function getBlurDataURL(imageSrc) {
  try {
    const buffer = await fs.readFile(path.join('./public', imageSrc));
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (err) {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  }
}

// استفاده در getStaticProps
export async function getStaticProps() {
  const courses = await fetchCourses();

  const coursesWithBlur = await Promise.all(
    courses.map(async (course) => ({
      ...course,
      blurDataURL: await getBlurDataURL(course.image),
    })),
  );

  return {
    props: { courses: coursesWithBlur },
    revalidate: 3600,
  };
}
