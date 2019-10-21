import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="CSS-HACKS - All posts" />
        <Bio />
        {posts.map(({ node }) => {
          const author = node.frontmatter.author ? node.frontmatter.author : ""
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article
              key={node.fields.slug}
              style={{
                marginBottom: "1.5rem",
                boxShadow: "1px 1px 2px #ddd",
                padding: "1rem 0.25rem",
              }}
            >
              <header>
                <h3>
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
              </header>
              <section>
                <blockquote
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
              <div style={{ marginLeft: "0.25rem" }}>
                <p>{author}</p>
                <small>{node.frontmatter.date}</small>
              </div>
            </article>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author
          }
        }
      }
    }
  }
`
