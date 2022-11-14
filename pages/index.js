import Head from 'next/head';
import Link from 'next/link';
import { SimpleGrid, Card, Image, Text, Button, Group, Badge } from '@mantine/core';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

export default function Home({ allPostsData }) {
  const cards = allPostsData.map((article) => (
    <Card key={article.id} shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={`/images/${article.id}.jpeg`}
          height={300}
          alt={article.title}
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{article.title}</Text>
        <Badge color="pink" variant="light">
          {article.date}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {article.contentHtml.substring(0, 150)}...
      </Text>

      <Link href={`/posts/${article.id}`}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          View Post
        </Button>
      </Link>
    </Card>
  ))

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>[Mantine Grid Card]</p>
        <p>
          (This is a sample website - I am building a site like this on{' '}
          <a href="https://ui.mantine.dev/category/article-cards">Mantine Article Cards</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>

        <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}